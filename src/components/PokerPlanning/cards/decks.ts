import { Deck } from './'

export const fibonacci: Deck = {
  name: 'fibonacci',
  cards: [
    { value: '0', numeric_value: 0, addable: true, description:'Task is already completed.' },
    { value: '1/2', numeric_value: 0.5, addable: true, description:'The task is tiny.' },
    { value: '1', numeric_value: 1, addable: true,description:'These are used for small tasks.' },
    { value: '2', numeric_value: 2, addable: true,description:'These are used for small tasks.' },
    { value: '3', numeric_value: 3, addable: true,description:'These are used for small tasks.'  },
    { value: '5', numeric_value: 5, addable: true,description:'These are used for medium sized tasks.'  },
    { value: '8', numeric_value: 8, addable: true ,description:'These are used for medium sized tasks.' },
    { value: '13', numeric_value: 13, addable: true,description:'These are used for medium sized tasks.'  },
    { value: '20', numeric_value: 20, addable: true,description:'These are used for large tasks.'  },
    { value: '40', numeric_value: 40, addable: true ,description:'These are used for large tasks.'},
    { value: '100', numeric_value: 100, addable: true,description:'These are used for very large tasks.' },
    { value: '∞', addable: false,description:'The task is huge.' },
    { value: '?', addable: false,description:'No idea how long it takes to complete this task.'  },
    { value: '☕', addable: false,description:'I am hungry 🙂 or Need a Break'  },
  ]
}
