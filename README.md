
# Flexirank

Flexible lexical ranking algorithm for optimized reorder-able lists.

Flexirank is a JavaScript utility library inspired by the concept of lexicographical ranking. It is designed to facilitate dynamic ranking within ordered lists, making it easier to manage positions, insertions, and reordering of items with minimal conflict and recalculation. By utilizing a base-26 number system for its calculations, Flexirank offers a flexible and intuitive approach to handling the complexities of list item ranking, similar to how alphabetical order works in a lexicographical system.

## Features

- **Lexicographical Ranking Inspired**: Draws inspiration from the principles of lexicographical ordering, providing a natural and efficient method for ranking items.
- **Base-26 Number System**: Employs a base-26 number system for rank calculations, enabling easy insertion and movement of items without the need for extensive recalculations.
- **Dynamic Ranking**: Generate unique ranks for items in a list, allowing for easy insertion and movement without the need to recalculate positions for the entire list.
- **Flexible Usage**: Suitable for various applications, from managing to-do lists to complex project management systems.
- **Lightweight and Fast**: Optimized for performance, ensuring quick computations even for large datasets.

## Installation

Install Flexirank by running:

```bash
npm install flexirank
```

## Usage

Nodejs

```javascript
const Flexirank = require('flexirank');

class ShoppingListItem {
    constructor(title, rank) {
        this.item = { title, rank };
    }

    get title() {
        return this.item.title;
    }

    get rank() {
        return this.item.rank;
    }
}

class ShoppingList {
    constructor() {
        this.items = {};
    }

    add(item) {
        console.log(`Adding item: ${item.title} with rank: ${item.rank}`);

        this.items[item.title] = item.rank;
    }

    rankFor(title) {
        return this.items[title] || '';
    }

    moveItem(title, newRank) {
        console.log(`Moving item: ${title} to new rank: ${newRank}`);

        this.items[title] = newRank;
    }

    show() {
        const mapToList = Object.entries(this.items);
        mapToList.sort((a, b) => a[1].localeCompare(b[1]));
        console.log(mapToList.map(e => e[0]));
    }
}

function main() {
    const shoppingList = new ShoppingList();

    // Example 1: Add milk as the first item in the shopping list
    let rank = Flexirank.newRank();
    shoppingList.add(new ShoppingListItem('Milk', rank));
    shoppingList.show(); // Output: [Milk]

    // Example 2: Add eggs below milk
    rank = Flexirank.newRank({ previousItemRank: shoppingList.rankFor('Milk') });
    shoppingList.add(new ShoppingListItem('Eggs', rank));
    shoppingList.show(); // Output: [Milk, Eggs]

    // Example 3: Add cheese above milk
    rank = Flexirank.newRank({ nextItemRank: shoppingList.rankFor('Milk') });
    shoppingList.add(new ShoppingListItem('Cheese', rank));
    shoppingList.show(); // Output: [Cheese, Milk, Eggs]

    // Example 4: Add chicken between cheese and milk
    rank = Flexirank.newRank({
        previousItemRank: shoppingList.rankFor('Cheese'),
        nextItemRank: shoppingList.rankFor('Milk')
    });
    shoppingList.add(new ShoppingListItem('Chicken', rank));
    shoppingList.show(); // Output: [Cheese, Chicken, Milk, Eggs]

    // Example 5: Move cheese between milk and eggs
    rank = Flexirank.newRank({
        previousItemRank: shoppingList.rankFor('Milk'),
        nextItemRank: shoppingList.rankFor('Eggs')
    });
    shoppingList.moveItem('Cheese', rank);
    shoppingList.show(); // Output: [Chicken, Milk, Cheese, Eggs]

    // Example 6: Move eggs to the top of the list
    rank = Flexirank.newRank({ nextItemRank: shoppingList.rankFor('Chicken') });
    shoppingList.moveItem('Eggs', rank);
    shoppingList.show(); // Output: [Eggs, Chicken, Milk, Cheese]

    // Example 7: Move chicken to the bottom of the list
    rank = Flexirank.newRank({ previousItemRank: shoppingList.rankFor('Cheese') });
    shoppingList.moveItem('Chicken', rank);
    shoppingList.show(); //  Output: [Eggs, Milk, Cheese, Chicken]
}

main();
```

## Documentation

### `newRank(options)`

Generates a new rank. The `options` object can include the following properties for positioning:

- `previousItemRank`: The rank before the new item. This is optional.
- `nextItemRank`: The rank after the new item. This is also optional.
- `bucketSize`: The size of the bucket for padding, if needed. This is optional.

### `decodeString(str, bucketSize)`

Decodes a string representation of a rank into its numerical value.

- `str`: The string representation of the rank to decode..
- `bucketSize`: The size of the bucket (largest amount of characters in the list) for padding the end, if needed. This is optional.

### `encodedString(rawValue, bucketSize)`

Encodes a numerical rank into a string representation.

- `rawValue`: The string representation of the rank to decode..
- `bucketSize`: The size of the bucket (largest amount of characters in the list) for padding the start, if needed. This is optional.
