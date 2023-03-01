// acc url = https://fruit-api.onrender.com/

const fruity = {
    baseurl: 'http://localhost:3000',
    async getFruit(query) {
        try {
            const pRes = await fetch(`${this.baseurl}/fruits/${query}`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    },

    async getAllFruits() {
        try {
            const pRes = await fetch(`${this.baseurl}/fruits`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    },

    // posts false? 
    async postFruit(fruitData) {
        const data = JSON.stringify(fruitData);
        console.log(fruitData);
        try {
            const pRes = await fetch(`${this.baseurl}/fruits`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            });

            const res = await pRes.json();

            return res;
        } catch (error) {
            return error;
        }
    }
}

module.exports = { fruity }