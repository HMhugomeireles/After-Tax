document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        // document ready

        // Table with data
        const source = '/table.json';

        const ui = new UI(document.querySelector('#output'));
        const form = document.querySelector('form');

        // event form submit
        const formSubmit = (event) => {
            event.preventDefault();

            // make inputs read only
            ui.lockInputs();
            // get values from the input
            const values = ui.getFormValues();

            // create new person
            const person = new Person(...values);

            // get Table Tax
            const promise = getTableTax(source);

            promise.then(res => {
                //console.log(person)
                const arrTiers = res.Unmarried[0]
                // make the pars and get the tier of the person
                const personIliquid = Number(person.iliquid);
                // get person tier
                const posTier = extractTier(arrTiers, personIliquid);
                // 
                const objTier = Object.values(res.Unmarried[posTier[0]]);
                // extract array from object
                const listTier = objTier[0];
                // get the tax
                const tax = listTier[person.nChildren];
                // make calculation
                const liquid = calculateLiquid(personIliquid, tax, person.socialTax);
                // set values to the person
                person.tier = posTier[1];
                person.tax = tax;
                person.gain = liquid;
                // Build UI with object person
                ui.showResponse(person);
                // listener orthers btn 


                
            }).catch(err => {
                ui.showMessage("Sorry isn't possible doing your wish. " + err.message, 'alert alert-danger');
            });

        }

        // Form listener
        form.addEventListener('submit', formSubmit);

        // verify the tier and return tier
        function extractTier(arr, iliquid) {
            const personTier = [];

            for (let i = 0; i < arr.length; i++) {
                if (iliquid > arr[i]) {
                    let post = i + 1;
                    personTier.push(post);
                    personTier.push(arr[i + 1]);
                    return personTier;
                }
            }

            return;

        }

        // open file table.json
        async function getTableTax(url) {

            const response = await fetch(url);
            const body = await response.json();

            if (!response.ok) {
                throw new Error(body.message);
            }

            return body;
        }

        // calculation of the value liquid receive
        function calculateLiquid(iliquid, tax, socialTax) {

            let taxPay = 100 - (tax + (socialTax / 10));
            return (iliquid * (taxPay / 100)).toFixed(2);

        }

    }
}