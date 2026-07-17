let killers = [];
let perks = {};
let remainingKillers = [];
let matchHistory = [];

$(async function() {

    const characterData = await $.getJSON('https://knucklesmontain242.github.io/characters.json');
    killers = Object.values(characterData);

    perks = await $.getJSON('https://knucklesmontain242.github.io/perks.json');

    startTournament();


    $("#nextMatch").click(nextMatch);
    $("#restart").click(startTournament);
});

function resolvePerk(perk) {
    const p = perks[perk];
    return {
        name: p.name,
        image: cleanImagePath(p.image),
    };

}

function cleanImagePath(path) {
    if (!path) return null;

    return path
        .replace(/^\/?Game\/UI\//i, "")
        .replace(/^\/?UI\//i, "")
        .replace(/^\/?UI\/UMGAssets\//i, "")
        .replace(/^\/?UMGAssets\//i, "");
}

function startTournament() {
    remainingKillers = [...killers];
    shuffle(remainingKillers);
    matchHistory = [];
    renderHistory();

    renderRemaining();
    $("#currentMatch").html(`
        <div class="ui raised segment" style="background:#1b1c1d;color:white;">

            <div class="ui three column stackable grid" style="margin-top:20px;">

                <!-- Player Killer -->
                <div class="column">
                    <div class="ui fluid card" style="background:#2b2c2d;color:white;">
                        <div class="image">
                            <img src="./Icons/CharPortraits/S01_DwightFairfield_Portrait.png">
                        </div>
                        <div class="content">
                            <div class="header">Dwight (the best killer)</div>
                            <div class="meta">this is meta (cope)</div>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <h1 class="ui center aligned header" style="color:white;font-size:4rem;margin-top:40px;">
                        what the fuck
                    </h1>
                </div>

                <div class="column">
                    <div class="ui fluid card" style="background:#2b2c2d;color:white;">
                        <div class="image">
                            <img class="flip" src="./Icons/CharPortraits/S01_DwightFairfield_Portrait.png">
                        </div>
                        <div class="content">
                            <div class="header">Dwight (the best killer)</div>
                            <div class="meta">this is meta (cope)</div>
                        </div>
                    </div>
                </div>

            </div>

            <h3 class="ui center aligned header" style="color:white;margin-top:30px;">
                PERKS TO USE
            </h3>
            <div class="ui centered four stackable cards">
            
                    <div class="card" style="background:#2b2c2d;color:white;">
                        <div class="content">
                            <div class="header">Prove Thyself</div>
                        </div>
                            <div class="image">
                                <img src="./Icons/Perks/iconPerks_proveThyself.png" style="padding:10px;">
                            </div>
                    </div>
                    
                    <div class="card" style="background:#2b2c2d;color:white;">
                        <div class="content">
                            <div class="header">Bond</div>
                        </div>
                            <div class="image">
                                <img src="./Icons/Perks/iconPerks_bond.png" style="padding:10px;">
                            </div>
                    </div>
                    
                    <div class="card" style="background:#2b2c2d;color:white;">
                        <div class="content">
                            <div class="header">Windows of Opportunity</div>
                        </div>
                            <div class="image">
                                <img src="./Icons/Perks/Kate/iconPerks_windowsOfOpportunity.png" style="padding:10px;">
                            </div>
                    </div>
                    
                    <div class="card" style="background:#2b2c2d;color:white;">
                        <div class="content">
                            <div class="header">Adrenaline</div>
                        </div>
                            <div class="image">
                                <img src="./Icons/Perks/iconPerks_adrenaline.png" style="padding:10px;">
                            </div>
                    </div>
            </div>

        </div>
    `);
}

function nextMatch() {
    if (remainingKillers.length === 0) {
        $("#currentMatch").html("<b>Completed! The entityt is satisfied for now</b><hr>Care to try again?");
        return;
    }

    const player = remainingKillers.shift();

    let perkDonor;
    do {
        perkDonor = killers[Math.floor(Math.random() * killers.length)];
    } while (perkDonor.id === player.id);

    const resolved = perkDonor.perks.map(resolvePerk);

    $("#currentMatch").html(`
        <div class="ui raised segment" style="background:#1b1c1d;color:white;">

            <div class="ui three column stackable grid" style="margin-top:20px;">

                <div class="column">
                    <div class="ui fluid card" style="background:#2b2c2d;color:white;">
                        <div class="image">
                            <img src="${cleanImagePath(player.image)}">
                        </div>
                        <div class="content">
                            <div class="header">${player.name}</div>
                            <div class="meta">YOU (THE PLAYER)</div>
                        </div>
                    </div>
                </div>

                <div class="column">
    <h1 class="ui center aligned header"
        style="
            color:white;
            font-size:3rem;
            margin-top:20px;
            margin-bottom:0;
            line-height:1;
        ">
        
        <img class="dwight"
             src="./Icons/CharPortraits/S01_DwightFairfield_Portrait.png"
             style="
                 height:120px;
                 margin-bottom:4px;
             ">
        
        <small style="
            display:block;
            font-size:0.85rem;
            opacity:0.7;
            margin-top:0;
            line-height:1.1;
        ">
            Okay… okay… stay calm, Dwight. You’ve survived worse. Probably.
        </small>

    </h1>
</div>


                <!-- Perk Donor Killer -->
                <div class="column">
                    <div class="ui fluid card" style="background:#2b2c2d;color:white;">
                        <div class="image">
                            <img src="${cleanImagePath(perkDonor.image)}">
                        </div>
                        <div class="content">
                            <div class="header">${perkDonor.name}</div>
                            <div class="meta">Perk Donor</div>
                        </div>
                    </div>
                </div>

            </div>

            <h3 class="ui center aligned header" style="color:white;margin-top:30px;">
                PERKS TO USE
            </h3>
            <div class="ui centered four stackable cards">
                ${resolved.map(p => `
                    <div class="card perk" style="background:#2b2c2d;color:white;cursor:pointer">
                        <div class="content">
                            <div class="header">${p.name}</div>
                        </div>
                        ${p.image ? `
                            <div class="image">
                                <img src="${cleanImagePath(p.image)}.png" style="padding:10px;">
                            </div>
                        ` : `
                            <div class="content">
                                <i>No image available</i>
                            </div>
                        `}
                    </div>
                    </a>
                `).join("")}
            </div>

        </div>
    `);

    matchHistory.push({
        player: player.name,
        donor: perkDonor.name,
        perks: resolved.map(p => p.name),
        time: new Date().toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
    });

    renderRemaining();
    renderHistory()
}

function generateKillerBackground() {
    const bg = document.createElement("div");
    bg.id = "killer-bg";

    killers.forEach(k => {
        const img = document.createElement("img");
        img.src = cleanImagePath(k.image);
        img.className = "killer-bg-img";
        bg.appendChild(img);
    });

    document.body.appendChild(bg);
}


function renderHistory() {
    $("#previousCount").text(matchHistory.length);
    $("#previousMatches").html(
        matchHistory.slice().reverse().map(m => `
            <div class="item">
                <i class="history icon"></i>
                <div class="content">
                    <div class="header">${m.player} -> ${m.donor}</div>
                    <div class="description">
                        Perks: <b>${m.perks.join("</b>, <b>")}</b> (${m.time})
                    </div>
                </div>
            </div>
        `).join("")
    );
}


function renderRemaining() {
    $("#remainingCount").text(remainingKillers.length);
    $("#remainingList").html(
        remainingKillers.map(k => `
            <div class="item">
                <i class="angle right icon"></i>
                <div class="content">${k.name}</div>
            </div>
        `).join("")
    );
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}