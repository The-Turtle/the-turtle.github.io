// Parse CSV text into an array of objects
function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const character = text[i];

        if (inQuotes) {
            if (character === '"' && text[i + 1] === '"') {
                field += '"';
                i++;
            } else if (character === '"') {
                inQuotes = false;
            } else {
                field += character;
            }
        } else if (character === '"') {
            inQuotes = true;
        } else if (character === ",") {
            row.push(field);
            field = "";
        } else if (character === "\n") {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else if (character !== "\r") {
            field += character;
        }
    }

    if (field || row.length) {
        row.push(field);
        rows.push(row);
    }

    const headers = rows.shift().map((header) => header.trim());
    return rows
        .filter((values) => values.some((value) => value.trim()))
        .map((values) => {
            const obj = {};
            headers.forEach(
                (header, i) => (obj[header] = values[i] ?? ""),
            );
            return obj;
        });
}

const photoPreview = document.getElementById("hill-photo-preview");
let previewRequest = 0;
const hidePhotoPreview = () => {
    previewRequest++; // Invalidate previews that are still decoding.
    photoPreview.hidden = true;
};
window.addEventListener("scroll", hidePhotoPreview, true);
window.addEventListener("resize", hidePhotoPreview);

async function showPhotoPreview(image) {
    hidePhotoPreview();
    const request = previewRequest;
    photoPreview.src = image.src;
    photoPreview.alt = image.alt;
    try {
        await photoPreview.decode();
    } catch {
        return;
    }
    if (request !== previewRequest) return;
    photoPreview.hidden = false;
    const size = photoPreview.offsetWidth;
    const rect = image.getBoundingClientRect();
    const left = rect.right + size + 12 <= innerWidth - 12
        ? rect.right + 12 : rect.left - size - 12;
    photoPreview.style.left = Math.max(12, left) + "px";
    photoPreview.style.top = Math.max(12, Math.min(rect.top, innerHeight - size - 12)) + "px";
}

function createPictureCell(name, tagName = "td") {
    const cell = document.createElement(tagName);
    cell.className = "hill-picture";
    const filename = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const image = document.createElement("img");
    image.src = "../files/images/sfhills/" + filename + ".jpg";
    image.alt = name;
    image.width = 96;
    image.height = 96;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
        cell.textContent = "Photo needed";
    });

    const previewTarget = tagName === "td" ? image : document.createElement("a");
    if (previewTarget === image) {
        image.tabIndex = 0;
    } else {
        previewTarget.appendChild(image);
    }
    previewTarget.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover)").matches) showPhotoPreview(image);
    });
    previewTarget.addEventListener("mouseleave", hidePhotoPreview);
    previewTarget.addEventListener("focus", () => showPhotoPreview(image));
    previewTarget.addEventListener("blur", hidePhotoPreview);
    cell.appendChild(previewTarget);
    return cell;
}

const FEET_TO_METERS = 0.3048;
const MIN_PROMINENCE_METERS = 16;
const useFeet = document.getElementById("use-feet");

function formatHeight(feet) {
    return Math.round(useFeet.checked ? feet : feet * FEET_TO_METERS);
}

function updateUnits() {
    const unit = useFeet.checked ? "ft" : "m";
    const cutoffFeet = Math.round(MIN_PROMINENCE_METERS / FEET_TO_METERS);
    document.querySelectorAll("[data-height-label]").forEach((heading) => {
        heading.textContent = heading.dataset.heightLabel + " (" + unit + ")";
    });
    document.querySelectorAll("[data-height-ft]").forEach((cell) => {
        cell.textContent = formatHeight(Number(cell.dataset.heightFt));
    });
    document.getElementById("height-unit-word").textContent = useFeet.checked ? "foot" : "meter";
    document.getElementById("prominence-cutoff").textContent = useFeet.checked
        ? "about " + cutoffFeet + " feet"
        : MIN_PROMINENCE_METERS + " meters";
}

useFeet.addEventListener("change", updateUnits);
updateUnits();

// Load hill data from CSV
fetch("sfhills.csv")
    .then((response) => {
        if (!response.ok) throw new Error("Could not load sfhills.csv: " + response.status);
        return response.text();
    })
    .then((csvText) => {
        const rows = parseCSV(csvText);

        // Sort once by prominence, breaking ties by elevation
        const allHills = rows.map((row) => ({
            name: row.name.trim() || null,
            lat: parseFloat(row.latitude),
            lng: parseFloat(row.longitude),
            elevation: parseFloat(row.elevation_ft),
            prominence: parseFloat(row.prominence_ft),
            notes: row.notes ? row.notes.trim() : "",
        })).sort((a, b) => b.prominence - a.prominence || b.elevation - a.elevation);

        // Split into main hills and honorable mentions
        const hills = allHills.filter((h) => h.prominence * FEET_TO_METERS >= MIN_PROMINENCE_METERS);
        const honorable = allHills.filter(
            (h) => h.prominence * FEET_TO_METERS < MIN_PROMINENCE_METERS && h.name,
        );

        const bounds = L.latLngBounds(allHills.map((hill) => [hill.lat, hill.lng]));
        const map = L.map("map", {
            maxBounds: bounds.pad(0.3),
            maxBoundsViscosity: 1.0,
            minZoom: 12,
        }).setView(bounds.getCenter(), 12);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Assign names to unnamed hills
        let unnamedCount = 0;
        hills.forEach((hill) => {
            if (!hill.name) {
                unnamedCount++;
                hill.name = "Unnamed Hill " + unnamedCount;
            }
        });

        function showHillOnMap(hill) {
            hidePhotoPreview();
            if (!map.hasLayer(hill.marker)) {
                includeHonorable.checked = true;
                updateHonorable();
            }
            document.getElementById("map").scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            map.flyTo(hill.marker.getLatLng(), 16, { duration: 1.5 });
            hill.marker.openTooltip();
        }

        function linkToHill(link, hill) {
            link.href = "#map";
            link.addEventListener("click", (event) => {
                event.preventDefault();
                showHillOnMap(hill);
            });
        }

        const tiers = [
            ["S", "#ff8787", "Mt. Davidson|Noe Peak|Bernal Hill|Corona Heights|Eureka Peak"],
            ["A", "#ffbd80", "Signal Point|Bayview Hill (Candlestick Hill)|Merced Heights|Russian Hill|Grand View Hill|Blue Tower Hill"],
            ["B", "#ffe084", "Visitacion Knob (McLaren Ridge)|Telegraph Hill|Strawberry Hill|Lone Mountain|Alcatraz Island|Prayerbrook Cross Hill|Alamo Heights (Hayes Hill)|Martha Hill|Crocker Amazon Hill|Fort Mason Hill|Sutro Heights|Tank Hill|Duncan Hill|Billy Goat Hill|Alta Plaza Park|Kite Hill"],
            ["C", "#c5e98c", "Potrero Hill|Mount Sutro|Nob Hill|Mount St. Joseph|Gold Mine Hill|Castro Hill|Mount Olympus|Cannon Hill|Unnamed Hill 1|La Portezuela|Fairmount Heights|Larsen Peak (Sunset Heights)|Battery Davis|City College Hill|Hunter's Point Shipyard Hill|Cathedral Hill|Lafayette Heights|Holly Hill|Heidelberg Hill"],
            ["D", "#8fd9bd", "Forest Hill|Stony Hill (Hunters Point Ridge)|Edgehill Heights|Buena Vista Heights|Rincon Hill|Clarendon Heights|Dolores Heights|Laurel Hill|Red Rock Hill|Anza Hill|Madrid Hill|Amuctac Hill|Little Bayview Hill (Tubsinte Hill)|Horner's Hill|Monterey Heights|George Sterling Park|Macaroon Hill|Pacheco Peak|Chicken Point|Mount Lick|Ignatius Heights|Lincoln Heights"],
            ["F", "#a9bafb", "Presidio Hill|Rob Hill|Hermit Rock|Pasadena Hill|Torpedo Point|Seal Rocks|Irish Hill|Casino Hill|Hawk Hill|Battery Dynamite"],
        ];
        tiers.forEach(([tier, color, names]) => {
            const row = document.getElementById("tier-list-tbody").insertRow();
            row.innerHTML = `<th scope="row" style="background: ${color}">${tier}</th><td><div class="tier-hills"></div></td>`;
            const members = new Set(names.split("|"));
            allHills.filter((hill) => members.has(hill.name))
                .forEach((hill) => {
                    const tile = createPictureCell(hill.name, "div");
                    if (honorable.includes(hill)) tile.classList.add("honorable");
                    const link = tile.querySelector("a");
                    linkToHill(link, hill);
                    const name = document.createElement("span");
                    name.textContent = hill.name.replace(/\s*\(.*?\)/g, "");
                    link.appendChild(name);
                    row.querySelector(".tier-hills").appendChild(tile);
                });
        });

        const honorableLayer = L.layerGroup();
        const includeHonorable = document.getElementById("include-honorable");
        let selectedMarker = null;
        let rank = 0;

        // Both tables use the same rows, photos, and map interactions.
        for (const [group, bodyId, layer] of [
            [hills, "hills-tbody", map],
            [honorable, "honorable-tbody", honorableLayer],
        ]) {
            const tbody = document.getElementById(bodyId);
            group.forEach((hill, i) => {
                const row = tbody.insertRow();
                row.id = (layer === map ? "hill-row-" : "honorable-row-") + i;
                row.insertCell().textContent = ++rank;
                const nameLink = document.createElement("a");
                nameLink.textContent = hill.name;
                linkToHill(nameLink, hill);
                row.insertCell().appendChild(nameLink);
                for (const height of [hill.elevation, hill.prominence]) {
                    const cell = row.insertCell();
                    cell.dataset.heightFt = height;
                    cell.textContent = formatHeight(height);
                }
                row.appendChild(createPictureCell(hill.name));
                row.insertCell().textContent = hill.notes;

                const marker = L.circleMarker([hill.lat, hill.lng], {
                    radius: 6,
                    fillColor: layer === map ? "#00796b" : "#999",
                    color: layer === map ? "#004d40" : "#666",
                    weight: 2,
                    fillOpacity: 0.8,
                }).addTo(layer);
                hill.marker = marker;

                marker.on("click", () => {
                    // On mobile, tap once for the name and again for the table row.
                    const isMobile = window.matchMedia("(max-width: 550px) or (orientation: portrait)").matches;
                    if (isMobile && selectedMarker !== marker) {
                        selectedMarker = marker;
                        marker.openTooltip();
                        return;
                    }
                    selectedMarker = null;
                    row.scrollIntoView({ behavior: "smooth", block: "center" });
                    row.style.backgroundColor = "#e0f7fa";
                    setTimeout(() => { row.style.backgroundColor = ""; }, 2000);
                });
            });
        }

        // Keep labels visible when zoomed in.
        function updateLabels() {
            const permanent = map.getZoom() >= 15;
            hills.concat(honorable).forEach(({ marker, name }) => {
                if (marker.getTooltip()?.options.permanent !== permanent) {
                    marker.unbindTooltip().bindTooltip(name, {
                        direction: "top",
                        offset: [0, -8],
                        permanent,
                    });
                }
            });
        }
        map.on("zoomend", updateLabels);
        updateLabels();

        function updateHonorable() {
            hidePhotoPreview();
            document.querySelectorAll(".tier-hills .honorable").forEach((tile) => {
                tile.hidden = !includeHonorable.checked;
            });
            if (includeHonorable.checked) {
                honorableLayer.addTo(map);
            } else {
                honorableLayer.remove();
            }
        }
        includeHonorable.addEventListener("change", updateHonorable);
        updateHonorable();
    })
    .catch((error) => {
        document.getElementById("map").textContent = "The hill data could not be loaded. Please reload the page.";
        console.error(error);
    });
