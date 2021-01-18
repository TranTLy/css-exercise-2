function getAllOptions(selectorElement) {
    const allOptions = []
    // const selectorElement = document.querySelector(".custom-select-wrap select")
    for (let i = 0; i < selectorElement.length; i++) {
        const name = selectorElement.options[i].innerHTML.trim()
        const value = selectorElement.options[i].value
        allOptions.push({ name, value })
    }
    return allOptions
}

function onSelectOption () {
    const value = this.getAttribute('data')
    const label = this.innerHTML
    const selectElement = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0]
    selectElement.value = value
    this.parentNode.parentNode.getElementsByClassName("placeholder")[0].innerHTML= label
    
    const displayedSelectElement = this.parentNode.parentNode.getElementsByClassName("options")[0]
    const optionElements = displayedSelectElement.childNodes
    
    optionElements && Array.from(optionElements).map(item =>{
        item.classList.remove('active')
        return null
    })
    this.classList.add('active')
}

function createOptionsForSelectElement (options) {
    const optionsWrapElement = document.createElement('div')
    optionsWrapElement.classList.add("options")

    options.map(item => {
        const element = document.createElement('div')
        element.innerHTML = item.name
        element.setAttribute('data', item.value)
        element.classList.add('option')
        element.addEventListener('click', onSelectOption)
        optionsWrapElement.appendChild(element)
        return null
    })

    return optionsWrapElement
}

function createPlaceholderForSelectElement (value) {
    const rs = document.createElement('div')
    rs.classList.add('placeholder')
    rs.innerHTML = value
    return rs
}

function toggleSelect (e) {
    this.classList.toggle('open')
}

function createCustomSelector() {
    const selectorWrapElements = document.querySelectorAll(".custom-select-wrap")
    selectorWrapElements.forEach(itemWrap => {
        const selectorElement = document.querySelector('select')

        const options = getAllOptions(selectorElement)
        const newSelect = document.createElement('div')
        newSelect.classList.add('custom-select')
        
        const placeholder = selectorElement.getAttribute('aria-placeholder')
        const placeholderElement = createPlaceholderForSelectElement(placeholder)
        newSelect.appendChild(placeholderElement)

        const optionElements = createOptionsForSelectElement(options)

        newSelect.appendChild(optionElements)
        newSelect.addEventListener('click', toggleSelect)
        
        itemWrap.appendChild(newSelect)
    });

}

window.addEventListener('load', (function () {
    createCustomSelector()
}))
