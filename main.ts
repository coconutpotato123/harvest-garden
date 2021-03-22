namespace SpriteKind {
    export const Veggie = SpriteKind.create()
    export const Sprout = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Sprout, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.player2.changeScoreBy(1)
    if (info.player1.score() == 20) {
        pause(100)
        game.over(false)
    }
    sprite.setKind(SpriteKind.Veggie)
    veggieIndex = randint(0, veggies.length - 1)
    veggieImg = veggies[veggieIndex]
    sprite.setImage(veggieImg)
    sprite.say("")
    sprite.follow(rabbit)
})
function chaseSprout () {
    if (targetSprout == null) {
        sprouts = sprites.allOfKind(SpriteKind.Sprout)
        spriteIndex = randint(0, sprouts.length - 1)
        targetSprout = sprouts[spriteIndex]
        targetSprout.say("Save ME!!!", 300)
        rabbit.follow(targetSprout)
    }
}
sprites.onOverlap(SpriteKind.Sprout, SpriteKind.Player, function (sprite, otherSprite) {
    info.player1.changeScoreBy(1)
    sprite.setKind(SpriteKind.Veggie)
    veggieIndex2 = randint(0, veggies.length - 1)
    veggieImg2 = veggies[veggieIndex2]
    sprite.setImage(veggieImg2)
    sprite.say("")
    sprite.follow(player)
    if (info.player1.score() == 20) {
        pause(100)
        game.over(true)
    }
})
let groundTile: tiles.Location = null
let groundIndex = 0
let sprout: Sprite = null
let veggieImg2: Image = null
let veggieIndex2 = 0
let spriteIndex = 0
let sprouts: Sprite[] = []
let targetSprout: Sprite = null
let veggieImg: Image = null
let veggieIndex = 0
let rabbit: Sprite = null
let player: Sprite = null
let veggies: Image[] = []
veggies = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 . . 6 6 6 6 . . 
    . . . . . . 6 6 6 6 6 7 7 6 . . 
    . . . . . 6 7 7 6 6 7 7 7 6 . . 
    . . . . . 6 7 7 6 7 7 6 6 6 . . 
    . . 6 6 6 6 7 7 7 7 7 6 6 . . . 
    . . 6 7 7 6 7 7 7 7 7 7 6 6 . . 
    . . 6 7 7 7 7 7 7 7 7 7 6 6 . . 
    . . 6 6 7 7 7 7 7 7 7 6 6 6 . . 
    . . . 6 6 6 6 6 7 7 6 6 . . . . 
    . . . . . . . 7 7 7 . . . . . . 
    . . . . . . . 7 7 1 . . . . . . 
    . . . . . . . 7 1 7 . . . . . . 
    . . . . . . . e . e . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 7 7 7 . 
    . . . . . . . . . . . . 7 . 7 7 
    . . . . . . . . . 4 4 4 4 . . 7 
    . . . . . . . . 4 4 4 4 4 . . . 
    . . . . . . . . 4 4 4 4 e . . . 
    . . . . . . . 4 4 4 4 e . . . . 
    . . . . . . 4 4 4 4 e . . . . . 
    . . . . . 4 4 4 e e . . . . . . 
    . . . . . 4 4 4 4 . . . . . . . 
    . . . . 4 4 4 e . . . . . . . . 
    . . . . 4 4 e . . . . . . . . . 
    . . . 4 e . . . . . . . . . . . 
    . . 4 4 . . . . . . . . . . . . 
    . . 4 e . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 6 6 6 6 . . . . 
    . . . . . . 6 6 7 7 7 6 6 . . . 
    . . . . . 6 7 7 7 6 7 7 6 . . . 
    . . . . 6 7 7 6 6 6 6 7 6 . . . 
    . . . 6 6 7 7 6 7 7 6 7 6 . . . 
    . . . 6 7 7 6 6 7 7 6 7 . . . . 
    . . . 6 7 6 6 7 7 6 6 6 . . . . 
    . . . 6 7 6 7 7 6 6 7 6 . . . . 
    . . . 6 7 6 7 6 7 7 6 . . . . . 
    . . . 6 7 6 6 7 7 6 6 . . . . . 
    . . . . 6 7 7 6 6 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . 7 7 . . . . . 
    . . . . . e e e e 7 e e e e . . 
    . . . . e e e e e e e e e e e . 
    . . . e e e d e e e e e e e e . 
    . . . e e e e e e e e e e e b . 
    . . e e e e e e e e e e e b b . 
    . . e e e e e e e e e e b b . . 
    . . e e f e e e e e e e b b . . 
    . . e e e e e e e e e b b . . . 
    . . e e e e e e d e b b . . . . 
    . . . . e b b b b b b . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . 7 . . . . 
    . . . . . . . 7 7 . 7 7 . . . . 
    . . . . . . . . 7 7 7 7 . . . . 
    . . . . . . . . . 7 7 . . . . . 
    . . . . . 4 4 2 2 7 4 2 2 . . . 
    . . . . 4 4 2 2 2 4 2 2 2 . . . 
    . . . . 4 4 2 2 4 2 2 2 2 . . . 
    . . . . 4 4 2 2 4 2 2 2 2 . . . 
    . . . . 2 4 2 2 4 2 2 2 2 . . . 
    . . . . 2 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 4 2 4 2 2 2 2 . . . 
    . . . . . . 4 2 4 4 2 2 2 . . . 
    . . . . . . 4 4 2 4 4 2 . . . . 
    . . . . . . . 4 2 2 . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 5 5 5 5 . . . . 
    . . . . . . 5 5 5 d 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 5 5 . . . 
    . . . . 5 d 5 5 5 5 4 4 4 . . . 
    . . . . 5 5 5 5 4 4 4 . . . . . 
    . . . . 5 5 5 4 . . . . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 d . . . 
    . . . 5 5 5 5 5 5 5 d d 5 5 . . 
    . . . 5 5 d d 5 5 5 5 5 5 5 . . 
    . . 5 5 5 d 5 5 5 d 5 5 5 4 . . 
    . . 5 5 5 5 5 5 5 5 5 5 4 4 . . 
    . . 5 5 5 d 5 5 d 5 5 4 4 . . . 
    . . 4 4 4 5 5 5 5 5 4 4 . . . . 
    . . . . 4 4 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 7 7 7 . . . . . 
    . . . . . . . . 7 . . . . . . . 
    . . . . . . 7 7 7 7 7 . . . . . 
    . . . . . 7 7 7 7 7 7 . . . . . 
    . . . . . c c c a a a . . . . . 
    . . . . . a a a a a a . . . . . 
    . . . . a a a a a a a a . . . . 
    . . . . c a a a a a a a . . . . 
    . . . . c a a a a a a a . . . . 
    . . . . c c a a a a a a . . . . 
    . . . . . c a a a a a a . . . . 
    . . . . . c c a a a a a . . . . 
    . . . . . . c c a a a a . . . . 
    . . . . . . a c c c . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
let sproutImg = img`
    . . . . 
    . 7 . 7 
    7 7 7 7 
    . 7 7 . 
    `
player = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . f . . . . . . . . . . . . . 
    . f . . . . . . . . . . . . . . 
    f f . . . . . . . . . 1 1 . . . 
    f . . . . . . . . . 1 f 1 . . . 
    f . . . . . . . . . f f 1 1 . . 
    f f . . . . . . . 1 1 1 1 1 1 . 
    . f . . . . . . . . f f f f . . 
    . f f f f f f f f f f f 5 f f . 
    . . f f f f f f f f f f f f f . 
    . . f f f f f f f f f . . . . . 
    . . f . f . . . f . f . . . . . 
    . . f . f . . . f . f . . . . . 
    . . f . f . . . f . f . . . . . 
    `, SpriteKind.Player)
player.z = 10
rabbit = sprites.create(img`
    . . . . . . 1 . . 1 1 . . . . . 
    . . . . . 1 1 . . 1 . . . . . . 
    . . . . . 1 3 . 1 1 . . . . . . 
    . . . . . 1 3 . 1 3 . . . . . . 
    . . . . . 1 3 . 1 3 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 f 1 1 f . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . 1 1 1 3 1 1 1 . . . . . 
    . . . . 1 . 1 3 1 . 1 . . . . . 
    . . . . . . 1 3 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 . 1 . . . . . . . 
    . . . . . . 1 . 1 . . . . . . . 
    `, SpriteKind.Enemy)
rabbit.z = 10
scene.setBackgroundColor(13)
tiles.setTilemap(tilemap`level`)
let availableTiles = tiles.getTilesByType(assets.tile`tile1`)
controller.moveSprite(player)
scene.cameraFollowSprite(player)
info.player1.setScore(0)
info.player2.setScore(0)
let intro = "BONJOUR! La Tour Eiffel et Beau, C'est entoure d'oiseaux. Je suis mans dans la mans avec ma famille, dans la paris. Les arbres et le gazon vert souffle de vent sur la terre. Le soleil aime le ciel comme si j'aime la Tour Eiffel."
game.showLongText(intro, DialogLayout.Full)
game.onUpdateInterval(500, function () {
    if (availableTiles.length > 0) {
        sprout = sprites.create(sproutImg, SpriteKind.Sprout)
        groundIndex = randint(0, availableTiles.length - 1)
        groundTile = availableTiles[groundIndex]
        tiles.placeOnTile(sprout, groundTile)
        availableTiles.removeAt(groundIndex)
        chaseSprout()
    }
})
