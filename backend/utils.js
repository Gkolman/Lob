
let data = require('../addresses')

  /*
    A tree containing all address data. Each location type of an address gets added
    to the tree I.E "San Francisco", "94550", "Seattle". Each location is assigned
    and addressId associated to address the in which the location pertains to.  
  */
class LocationTree {
	constructor(parent = null, addressId) {
		this.parent = parent
		this.ids = parent ? new Set([addressId]) : new Set()
		this.children = {}
	}
	/*
		takes a location prefix and returns a list of address id's it associated with.
	*/
	getLocation(location) {
		location = location.toLowerCase()
		let result = []
		let pointer = this
		let letterIndex = 0
		if (!pointer.children[location[letterIndex]]) { return result }
		while (pointer.children[location[letterIndex]]) {
			pointer = pointer.children[location[letterIndex]]
			letterIndex++
		}
		if (letterIndex <= location.length -1) { return [] }
		pointer.ids.forEach((value) => {result.push(value)})
		return result
	}
	/*
		Takes a location and an address id. Then adds the location to the tree
    as well as assigns the address id to which the location corresponds with.
	*/
	addLocation(location, addressId) {
		location = location.toLowerCase()
    let letterIndex = 0
    let pointer = this
    while (pointer.children[location[letterIndex]]) {
        pointer = pointer.children[location[letterIndex]]
        pointer.ids.add(addressId)
        letterIndex++
    }
    while (letterIndex < location.length) {
        let locationTree = new LocationTree(pointer, addressId)
        pointer.children[location[letterIndex]] = locationTree
        pointer = locationTree
        letterIndex++
    }
	}
	/*
		Takes a location and an address id. Then deletes the location from the
    tree as well as the address id to which the location corresponds with.
	*/
	deleteLocation(location, addressId) {
		location = location.toLowerCase()
		if (!location.length) { return }
		let letterIndex = 0
		let pointer = this.children[location[letterIndex]]
		while (pointer) {
				pointer.ids.delete(addressId)
				if (pointer.ids.size === 0) {
					delete pointer.parent.children[location[letterIndex]]
					return
				}
				letterIndex++
				pointer = pointer.children[location[letterIndex]]
		}
	}
}
  /*
    A class containing all of the addresses. Each address gets stored in the addresses
    hash where the key is the address Id which gets created on entry and the value is the
    corresponding address. The location bank property is a tree containing the data of all
    addresses and is an instance of LocationTree. 
  */
class AddressTree {
	constructor(addresses) {
		this.currentIndex = 0
		this.addresses = {}
		this.locationBank = new LocationTree()
		for (var i = 0; i < addresses.length; i++) {
			this.currentIndex = i
			this.addAddress(addresses[i])
		}
    this.currentIndex++
	}
  /*
    Takes a prefix of or an entire location and returns a list of addresses
    matching that location. 
  */
	getAddress(location) {
		let addresses = this.locationBank.getLocation(location)
		return addresses.map((addressId) => {
			let address = this.addresses[addressId]
			return {
				"line1": address.line1,
				"line2": address.line2,
				"city" : address.city,
				"state" : address.state,
				"zip" : address.zip,
				"id" : addressId,
			}
		})
	}
  /*
    Adds an address's data to the location bank for fast look up as well as
    as well as assigns an associated address id which gets inserted into the
    addresses list. 
  */
	addAddress(address) {
		for ( var locationType in address) {
			this.locationBank.addLocation(address[locationType], this.currentIndex)
		}
		this.addresses[this.currentIndex] = address
		this.currentIndex+=1
	}
  /*
    Deletes the address from the location bank as well as removes it from the
    addresses list.
  */
	deleteAddress(addressId) {
		let address = this.addresses[addressId]
		if (!address) { return }
		for (var locationType in address) {
			let location = address[locationType]
			this.locationBank.deleteLocation(location, addressId)
		}
		this.addresses[addressId] = null
	}

	editAddress(addressId, updates) {
		this.deleteAddress(addressId)
		this.addAddress(updates)
	}
}
let addressSet = new AddressTree(data)

module.exports = { 
  addressSet: addressSet
}


