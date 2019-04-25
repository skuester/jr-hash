# JavaScript Ruby Hash

## Installation

> npm install --save jr-hash

## Reason for Existing

I love Ruby's Hash class. In particular, I love (and often miss) the way it allows you to initialize missing keys. I frequently find I want this during reducing operations. I often want to build up various collections, and during a loop, need to either retreive the existing one, or build and then save a new one. Ruby's Hash provides an elegant way to tackle this kind of problem.

Take the following example:

```javascript
let heroes = [
    { type: 'human', name: 'Batman' },
    { type: 'alien', name: 'Superman' },
    { type: 'alien', name: 'Martian Manhunter' },
    { type: 'human', name: 'Green Lantern' },
]

// desired output
let hero_lists_by_type = {
    human: { title: 'human heroes', list: [ 'Batman', 'Green Lantern' ] },
    alien: { title: 'alien heroes', list: [ 'Superman', 'Martian Manhunter' ] },
}

// suppose we have somewhere in our code

let hero_lists_by_type = {}

// ...

function record_hero(hero, hero_lists_by_type) {
    if (!hero_lists_by_type[hero.type]) {
        hero_lists_by_type[hero.type] = { title: `${hero.type} heroes`, list: [] }
    }
    hero_lists_by_type[hero.type].push(hero.name)
}
```

This certainly appears like we are doing a lot of setup work, which obscures our intention to simply record something. Plus, I sure hope we don't want to initialize that value in more than one place.

Compare that with the following, using Hash:

```javascript
const Hash = require('jr-hash')

let hero_lists_by_type = new Hash((h, k) => h[k] = { title: `${k} heroes`, list: [] }))

// ...

function record_hero(hero, hero_lists_by_type) {
    hero_lists_by_type.get(hero.type).list.push(hero.name)
}
```

Now, did we save the world? No. But it makes me happier. So that's why I made this. Thanks, Ruby.



## ISC License (ISC)
Copyright 2019 Shane Kuester

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.