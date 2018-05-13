const $$ = str => document.querySelectorAll(str)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const pickRandom = arr => Math.floor(Math.random() * arr.length)
const readable = 'abcdefghijkmnpqrstuvwxyzACEFHJKLMNPRTUVWXY3479'
const hashids = new Hashids('', 0, readable)
const store = {
	DOM: document.querySelector('.Navbar-state'),
	getState : () => {
		return hashids.decode(window.location.hash.replace(/^#/, '')) || []
	},
	setState : elements => {
		const state = hashids.encode(elements.map($el => +$el.dataset.index))
		store.DOM.href = `/#${state}`
		store.DOM.innerHTML = state
	},
}

const change = ($el, state) => {
	const options = JSON.parse($el.dataset.options.replace(/'/g, '"'))
	const index = typeof state === 'number' ? state : pickRandom(options)
	const option = options[index]
	$el.dataset.index = index
	$el.querySelector('.response').innerHTML = option
}

const show = async (elements, state = []) => {
	for(index in elements){
		await delay(250)
		change(elements[index], state[index])
	}
	store.setState(elements)
}

const handleClick = event => {
	let index = 0
	while(!event.path[index].dataset.options)
		if(!event.path[++index]) return
	change(event.path[index])
	store.setState(elements)
}

const bindClick = elements => elements.forEach($el => (
	$el.addEventListener('click', handleClick, {passive: true})
))

const start = async elements => {
	await show(elements, store.getState())
	bindClick(elements)
}

start([...$$('.Line[data-options]')])
