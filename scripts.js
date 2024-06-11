document.addEventListener("DOMContentLoaded", function () {
  const classifiche = [
    "classifica1.json",
    "classifica2.json",
    "classifica3.json",
    "classifica4.json",
    "classifica5.json",
  ];

  classifiche.forEach((classifica, index) => {
    const timestamp = new Date().getTime(); // Ottieni il timestamp corrente
    const urlWithTimestamp = `${classifica}?_=${timestamp}`; // Aggiungi il timestamp alla URL

    fetch(urlWithTimestamp)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Errore nel caricamento della classifica: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        let container = document.getElementById(`classifica${index + 1}`);
        let html = "";

        // Genera la sezione "Lobby" per gli indici da 1 a 4
        // if (index < 4) {
        //   html += `<h2>Lobby ${index + 1}</h2>`;
        // } else {
        //   // Genera la sezione "Classifica Generale" per l'indice 5
        //   html += `<h2>Classifica Generale</h2>`;
        // }
        // Genera il pulsante per nascondere/mostrare le colonne
        html += `<button id="toggleColumnsButton${
          index + 1
        }" class="toggleColumnsButton">Mostra colonne dei punteggi dettagliati</button>`;
        html += `<div style="margin-bottom: 5px;"></div>`;
        // Genera la tabella
        html += `<div class="table-container1"><table id="table${
          index + 1
        }"><thead><tr>
                            <th>Pos.</th>
                            <th>ID PSN</th>
                            <th>ID GT7</th>
                            <th class="totalone">TOTALE</th>
                            <th class="pole hidden">Pole WG</th>
                            <th class="gara hidden">Gara WG</th>
                            <th class="gv hidden">GV WG</th>
                            <th class="totale">W. Glen</th>
                            <th class="pole hidden">Pole ATL</th>
                            <th class="gara hidden">Gara ATL</th>
                            <th class="gv hidden">GV ATL</th>
                            <th class="totale">R. Atlanta</th>
                            <th class="pole hidden">Pole FUJ</th>
                            <th class="gara hidden">Gara FUJ</th>
                            <th class="gv hidden">GV FUJ</th>
                            <th class="totale">Fuji</th>
                            <th class="pole hidden">Pole AUT</th>
                            <th class="gara hidden">Gara AUT</th>
                            <th class="gv hidden">GV AUT</th>
                            <th class="totale">Autopolis</th>
                            <th class="pole hidden">Pole Spa</th>
                            <th class="gara hidden">Gara Spa</th>
                            <th class="gv hidden">GV Spa</th>
                            <th class="totale">Spa</th>
                            <th class="pole hidden">Pole RB</th>
                            <th class="gara hidden">Gara RB</th>
                            <th class="gv hidden">GV RB</th>
                            <th class="totale">Red Bull</th>
                            <th class="totalone">TOTALE</th>
                        </tr></thead><tbody>`;

        data.forEach((item) => {
          html += `<tr>
                                <td>${item.posizione || ""}</td>
                                <td>${item.id_psn || ""}</td>
                                <td>${item.id_gt7 || ""}</td>
                                <td class="totalone">${item.totale || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_wg || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_wg || ""
                                }</td>
                                <td class="gv hidden">${item.gv_wg || ""}</td>
                                <td class="totale">${item.tot_wg || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_atl || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_atl || ""
                                }</td>
                                <td class="gv hidden">${item.gv_atl || ""}</td>
                                <td class="totale">${item.tot_atl || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_fuj || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_fuj || ""
                                }</td>
                                <td class="gv hidden">${item.gv_fuj || ""}</td>
                                <td class="totale">${item.tot_fuj || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_aut || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_aut || ""
                                }</td>
                                <td class="gv hidden">${item.gv_aut || ""}</td>
                                <td class="totale">${item.tot_aut || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_spa || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_spa || ""
                                }</td>
                                <td class="gv hidden">${item.gv_spa || ""}</td>
                                <td class="totale">${item.tot_spa || ""}</td>
                                <td class="pole hidden">${
                                  item.pole_rb || ""
                                }</td>
                                <td class="gara hidden">${
                                  item.gara_rb || ""
                                }</td>
                                <td class="gv hidden">${item.gv_rb || ""}</td>
                                <td class="totale">${item.tot_rb || ""}</td>
                                <td class="totalone">${item.totale || ""}</td>
                            </tr>`;
        });

        html += `</tbody></table></div>`; // Chiudi il contenitore scrollabile
        container.innerHTML = html;

        // Aggiungi l'evento click al pulsante per nascondere/mostrare le colonne
        const toggleColumnsButton = document.getElementById(
          `toggleColumnsButton${index + 1}`
        );
        toggleColumnsButton.addEventListener("click", function () {
          const table = document.getElementById(`table${index + 1}`);
          const columnsToToggle = table.querySelectorAll(".pole, .gara, .gv");
          columnsToToggle.forEach((column) => {
            column.classList.toggle("hidden");
          });
          // Verifica lo stato di una colonna specifica per determinare il testo del pulsante
          const isHidden = table.querySelector(".pole.hidden");
          const buttonText = isHidden
            ? "Mostra colonne dei punteggi dettagliati"
            : "Nascondi colonne dei punteggi dettagliati";
          toggleColumnsButton.textContent = buttonText;
        });
      })
      .catch((error) => {
        console.error("Errore nel caricamento della classifica:", error);
        let container = document.getElementById(`classifica${index + 1}`);
        container.innerHTML = `<p>Errore nel caricamento della classifica.</p>`;
      });
  });
  // Aggiungi l'evento click per le sezioni delle tendine
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  function initializeCountdown(id, endtime) {
      const timerElement = document.getElementById(id);
      function updateCountdown() {
          const now = new Date().getTime();
          const timeleft = endtime - now;

          const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

          timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

          if (timeleft < 0) {
              clearInterval(countdowninterval);
              timerElement.innerHTML = "EXPIRED";
          }
      }

      const countdowninterval = setInterval(updateCountdown, 1000);
  }

  const lobby1EndTime = new Date("Jun 11, 2024 21:00:00").getTime();
  const lobby2EndTime = new Date("Jun 11, 2024 22:10:00").getTime();
  const lobby3EndTime = new Date("Jun 13, 2024 21:00:00").getTime();
  const lobby4EndTime = new Date("Jun 13, 2024 22:10:00").getTime();

  initializeCountdown("timer1", lobby1EndTime);
  initializeCountdown("timer2", lobby2EndTime);
  initializeCountdown("timer3", lobby3EndTime);
  initializeCountdown("timer4", lobby4EndTime);
});

