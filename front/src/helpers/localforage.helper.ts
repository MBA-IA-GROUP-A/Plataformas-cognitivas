import localforage from 'localforage'

localforage.config({
  name: 'plataforms-1iar',
  storeName: 'plataforms-1iar',
  driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB, localforage.WEBSQL],
})

export default localforage
