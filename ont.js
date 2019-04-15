const aloitusAika = new Date()

setTimeout(() => {
  console.log('\t100 millisekuntia.. vai oikeasti', 
  new Date() - aloitusAika, 'millisekuntia\n')
}, 100)

console.log('Minut suoritetaan ensimmäisenä!\n')

console.log('Aloitetaan while looppi\n')

while (new Date() - aloitusAika < 1000) {}

console.log('Loopin alusta on noin', 
((new Date() - aloitusAika) / 1000).toFixed(4), 
'sekuntia\n')

console.log('Minä olen synkroninen tuloste\n')
