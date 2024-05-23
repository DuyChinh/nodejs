
class Transformer {
    #data;//private attribute
    constructor(resource) {
        // console.log(resource);
        //resource là 1 mảng

        //resource là 1 object
        if(Array.isArray(resource)) {
            this.#data = resource.map(instance => this.response(instance));
        } else {
            this.#data = this.response(resource);
        }
        return this.#data;
    }
    
}

module.exports = Transformer;
