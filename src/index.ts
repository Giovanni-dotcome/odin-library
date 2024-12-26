interface bookInterface {
    id: number;
    title: string;
    author: string;
    pages: number;
    pagesRead?: number;
    read: boolean;
}

class Library {
    private books: bookInterface[] = [];
    private idCounter: number = 0;

    addBook = (title: string, author: string, pages: number, read: boolean, pagesRead?: number): void => {
        this.books.push({
            ...{ title, author, pages, read, pagesRead },
            id: this.idCounter++,
        });
        this.display()
    };

    public removeBook = (id: number): void => {
        const index = this.books.findIndex((book) => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
        this.display();
    };
    public updatePagesRead(pages: number, id: number): void {
        const bookToUpdate = this.books.find(book => book.id === id)
        if (bookToUpdate) {
            if (pages > bookToUpdate.pages)
                pages = bookToUpdate.pages
            bookToUpdate.pagesRead = pages
        }
        this.display()
    }

    public completeBook(id: number): void {
        const newbook = this.books.find(book => book.id === id)
        if (newbook)
            newbook.pagesRead = newbook.pages
        this.display()
    }

    display(): void {
        const libraryHtml = document.querySelector(`.library`) as HTMLElement;
        libraryHtml.innerHTML = ''; // Clear existing content

        this.books.forEach((book) => {
            const percentageRead = Math.round(
                (book.pagesRead ? book.pagesRead : 0) / book.pages * 100
            );
            const cardHtml = `
                <div class="card" id="${book.id}">
                    <div class="details">
                        <h3>${book.author}</h3>
                        <h2>${book.title}</h2>
                    </div>
                    <div class="progress">
                        <h3>Progress</h3>
                        <div class="progress-bar">
                            <div class="full" style="width: ${percentageRead}%"></div> 
                            <div class="empty" style="width: ${100 - percentageRead}%"></div>
                        </div>
                        <div class="pages">
                            
                            <h4><input type="number" name="pagesRead" class="pagesReadUpdate" placeholder="Pages Read" value="${book.pagesRead || 0}">/${book.pages} pages</h4>
                            <h4>${percentageRead}%</h4>
                        </div>
                    </div>
                    <div class="actions">
                        <a class="remove-book-btn"><img src="./public/minus-circle.svg" alt="Remove Book Icon"></a>
                        <a class="complete-book-btn"><img src="./public/check-circle.svg" alt="Completed Book Icon"></a>
                    </div>
                </div>
            `;
            libraryHtml.innerHTML += cardHtml;
        });

        const addBookCardHTML = `
            <div class="card add-book-card">
                <img src="../dist/public/plus-circle.svg" alt="Add Icon">
            </div>
        `;
        libraryHtml.innerHTML += addBookCardHTML;

        const removeBookBtns = document.querySelectorAll('.remove-book-btn');
        removeBookBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const card = (event.target as HTMLElement).closest('.card');
                if (card) {
                    const id = parseInt(card.id); // Ensure id is a number
                    this.removeBook(id); // Call removeBook with the correct id
                }
            });
        });

        const completeBookBtns = document.querySelectorAll('.complete-book-btn');
        completeBookBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const card = (event.target as HTMLElement).closest('.card');
                if (card) {
                    this.completeBook(Number(card.id))
                }
            })
        })


        const pagesReadUpdates = document.querySelectorAll('.pagesReadUpdate')
        pagesReadUpdates.forEach(element => {
            element.addEventListener('keydown', event => {
                if ((event as KeyboardEvent).key === 'Enter')
                    (element as HTMLInputElement).blur()
            })
            element.addEventListener('blur', event => {
                const card = ((event.target as HTMLElement).closest('.card') as HTMLElement);
                const id = Number(card.id)
                const pages = Number((event.target as HTMLInputElement).value);
                this.updatePagesRead(pages, id)
            })
        });

        const addBookCard = document.querySelector('.add-book-card') as HTMLElement;
        addBookCard?.addEventListener('click', () => {
            toggleScroll();
            toggleHide(addBookPage);
        });


    }
}
const pagesReadInput = document.querySelector('#pagesRead') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;
const closeAddBookWindow = document.querySelector('.close-add-book-window') as HTMLElement;
const addBookPage = document.querySelector('.add-book-page') as HTMLElement;
const read = document.querySelector('input[type="checkbox"]');

closeAddBookWindow?.addEventListener('click', () => {
    console.log('clicked')
    toggleScroll();
    toggleHide(addBookPage);
});

read?.addEventListener('click', () => {
    toggleHide(pagesReadInput);
});


function toggleHide(element: HTMLElement) {
    if (element?.classList.contains('hidden'))
        element?.classList.remove('hidden');
    else
        element?.classList.add('hidden');
}
function toggleScroll() {
    if (body.classList.contains('no-scroll'))
        body.classList.remove('no-scroll');
    else
        body.classList.add('no-scroll');
}

const lib: Library = new Library();
lib.addBook("Moby Dick", "Herman Melville", 500, false, 50);
lib.addBook("Le Vite dei Cesari", "Svetonio", 350, false, 70);
