document.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('[data-tab-button]')

    for (let i=0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(botao){
            const abaAlvo = botao.currentTarget.dataset.tabButton
            esconderAbas()
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`)
            aba.classList.add('playlist-view__content--is-active')
        })
    }
})

function esconderAbas(){
    const tabsContainer = document.querySelectorAll('[data-tab-id]')

    for (let i = 0; i < tabsContainer.length; i++){
        tabsContainer[i].classList.remove('playlist-view__content--is-active')
    }

}

//TESTE DE FUNCAO DAS PLAYLISTS
document.addEventListener('DOMContentLoaded', function() {
    const playlistsData = {
        curtidas: [
            {
                id: 'curtidas-0',
                title: 'DIGITAL RICH',
                artist: 'Wav Haven',
                album: 'DIGITAL RICH',
                duration: '3:34',
                imageUrl: 'https://i.scdn.co/image/ab67616d00001e02b2ed2454d2b735a3bdc8d122'
            },
            {
                id: 'curtidas-1',
                title: 'Dell Curry',
                artist: 'Xavier Top Floor',
                album: 'The view From Up Here',
                duration: '2:19',
                imageUrl: 'https://i.scdn.co/image/ab67616d00001e02b09a61449f6f01ea238ec6d4'
            },
            {
                id: 'curtidas-2',
                title: 'BREAD',
                artist: 'Jaylikethealphabet',
                album: 'BREAD',
                duration: '3:40',
                imageUrl: 'https://i.scdn.co/image/ab67616d00001e0227203a697a5dc58663f83075'
            },
             {
                id: 'curtidas-3',
                title: 'My Drip',
                artist: 'Quise.B',
                album: 'Let That Money Talk',
                duration: '2:57',
                imageUrl: 'https://i.scdn.co/image/ab67616d00001e02abdac71077d714b7c6809d44'
            }
        ],
        rock: [
            {
                id: 'rock-0',
                title: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                duration: '5:55',
                imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e33d06533821437495d20770'
            },
            {
                id: 'rock-1',
                title: 'Stairway to Heaven',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin IV',
                duration: '8:02',
                imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d09036735ae36881f151e687'
            }
        ],
        // Adicione aqui os dados para 'episodios', 'eletronicas', 'hiphop', etc.
    };

    // =========================================================================
    //  2. SELETORES DE ELEMENTOS DO DOM
    // =========================================================================
    // Selecionamos todos os elementos que precisaremos manipular.
    const tabButtons = document.querySelectorAll('[data-tab-button]');
    const playlistContents = document.querySelectorAll('[data-tab-id]');
    const allTracks = document.querySelectorAll('.tracklist__track');

    const detailsPanel = document.querySelector('.artist-details');
    const detailsContent = detailsPanel.querySelector('.artist-details__content');
    const detailsPlaceholder = detailsPanel.querySelector('.artist-details__placeholder');
    const trackTitleEl = document.getElementById('details-track-title');
    const trackArtistsEl = document.getElementById('details-track-artists');
    const artistImageEl = document.getElementById('details-artist-image');

    // =========================================================================
    //  3. LÓGICA DE EVENTOS (EVENT LISTENERS)
    // =========================================================================

    // --- Evento para trocar de Playlist (Abas) ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tabButton;
            
            // Gerencia a visibilidade das playlists
            hideAllPlaylists();
            showPlaylist(targetTabId);

            // Reseta o painel de detalhes e o estado de faixa ativa
            clearDetailsPanel();
            removeActiveTrackState();
        });
    });

    // --- Evento para clicar em uma Faixa ---
    allTracks.forEach(track => {
        track.addEventListener('click', (event) => {
            const clickedTrack = event.currentTarget;
            const trackId = clickedTrack.dataset.trackId;

            // Busca os dados completos da faixa clicada
            const trackData = findTrackById(trackId);
            
            if (trackData) {
                // Atualiza o painel de detalhes com as informações da faixa
                updateDetailsPanel(trackData);

                // Atualiza o estado visual para mostrar qual faixa está ativa
                removeActiveTrackState();
                clickedTrack.classList.add('tracklist__track--is-active');
            }
        });
    });

    // =========================================================================
    //  4. FUNÇÕES AUXILIARES
    // =========================================================================

    function hideAllPlaylists() {
        playlistContents.forEach(content => {
            content.classList.remove('playlist-view__content--is-active');
        });
    }

    function showPlaylist(tabId) {
        const targetContent = document.querySelector(`[data-tab-id="${tabId}"]`);
        if (targetContent) {
            targetContent.classList.add('playlist-view__content--is-active');
        }
    }
    
    // Procura uma faixa em todo o nosso objeto 'playlistsData' pelo seu ID único
    function findTrackById(id) {
        for (const playlistKey in playlistsData) {
            const playlist = playlistsData[playlistKey];
            const foundTrack = playlist.find(track => track.id === id);
            if (foundTrack) {
                return foundTrack;
            }
        }
        return null; // Retorna nulo se não encontrar a faixa
    }

    // Atualiza os elementos do painel de detalhes com base nos dados fornecidos
    function updateDetailsPanel(data) {
        if (data) {
            trackTitleEl.textContent = data.title;
            trackArtistsEl.textContent = data.artist;
            artistImageEl.src = data.imageUrl;
            artistImageEl.alt = `Capa do álbum ${data.album}`;

            // Mostra o conteúdo dos detalhes e esconde o placeholder
            detailsContent.style.display = 'block';
            detailsPlaceholder.classList.remove('artist-details__placeholder--is-active');
        } else {
            // Se não houver dados, limpa o painel
            clearDetailsPanel();
        }
    }
    
    // Reseta o painel de detalhes para o estado inicial (mostrando o placeholder)
    function clearDetailsPanel() {
        detailsContent.style.display = 'none';
        detailsPlaceholder.classList.add('artist-details__placeholder--is-active');
    }

    // Remove a classe de 'ativa' de todas as faixas
    function removeActiveTrackState() {
        document.querySelectorAll('.tracklist__track').forEach(t => {
            t.classList.remove('tracklist__track--is-active');
        });
    }

});