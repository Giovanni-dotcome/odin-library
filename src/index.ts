console.log('active script')
const pagesReadInput = document.querySelector('#pagesRead') as HTMLElement;
const addBookCard = document.querySelector('.add-book-card') as HTMLElement;
const addBookPage = document.querySelector('.add-book-page') as HTMLElement;
const removeBookBtn = document.querySelector('.remove-book-btn') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;

const read = document.querySelector('input[type="checkbox"]');

read?.addEventListener('click', () => {
    toggleHide(pagesReadInput);
})

function toggleScroll() {
    if (body.classList.contains('no-scroll'))
        body.classList.remove('no-scroll');
    else
        body.classList.add('no-scroll')
}

function toggleHide(element: HTMLElement) {
    if (element?.classList.contains('hidden'))
        element?.classList.remove('hidden')
    else
        element?.classList.add('hidden')
}
addBookCard?.addEventListener('click', () => {
    toggleScroll()
    toggleHide(addBookPage);
})
removeBookBtn?.addEventListener('click', () => {
    toggleScroll()
    toggleHide(addBookPage);
})
