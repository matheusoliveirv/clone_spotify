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