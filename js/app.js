const playersData = [];

$(document).ready(() => {
    fetchData("../data/data.xml");
});

const fetchData = (url) => {
    $.ajax({
        dataType: "xml",
        type: "GET",
        url,
        success: function (xml) {
            $(xml)
                .find("players")
                .each(function () {
                    $(this)
                        .find("player")
                        .each(function () {
                            const player = {
                                id: $(this).find("id").text(),
                                nom: $(this).find("nom").text(),
                                prenom: $(this).find("prenom").text(),
                                img_path: $(this).find("img_path").text(),
                                bio: $(this).find("bio").text(),
                                dob: {
                                    day: $(this).find("dob").find("day").text(),
                                    month: $(this).find("dob").find("month").text(),
                                    year: $(this).find("dob").find("year").text(),
                                },
                            };
                            playersData.push(player);
                        });
                    displayPlayers();
                });
        },
        error: function (result, statut, error) {
            console.log(error);
        },
    });
};

const displayPlayers = () => {
    playersData.forEach((player) => {
        $(".players-container").append(`<div id="${player.id}" class='player-card'><img src='../images/${player.img_path}' /></div>`);
    });

    $(".player-card").each((index) => {
        $(`#${index + 1}`).click(() => {
            const player = playersData[index];
            console.log(player);
            $(".modal").modal();
            $(`.player-card`).removeClass("selected");
            $(`#${index + 1}`).addClass("selected");
            $(".player-name").text(`${player.prenom} ${player.nom}`);
            $(".player-bio").text(`${player.bio}`);
            $(".player-bird").text(`Date de naissance : ${player.dob.day}/${player.dob.month}/${player.dob.year}`);
        });
    });
};
