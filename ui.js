// Class UI
class UI {
    constructor(element){
        this.element = element;
        this.name = document.querySelector('#name');
        this.iliquid = document.querySelector('#iliquid');
        this.status = document.querySelector('#status');
        this.children = document.querySelector('#children');
        this.socialTax = document.querySelector('#socialTax');
    }
    showResponse(person) {
        console.log(this.element)
           this.element.innerHTML=`
            <div class="row">
                <div class="col-6 m-1 card p-3">
                    <div class="row">
                        <div class="col">
                            <h3 class="text-center">${person.name}</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Iliquid Amount:</p>
                        </div>
                        <div class="col">
                            <p>${person.iliquid}€</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Marital status:</p>
                        </div>
                        <div class="col">
                            <p>${person.status}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Nº Children:</p>
                        </div>
                        <div class="col">
                            <p>${person.nChildren}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Social Tax:</p>
                        </div>
                        <div class="col">
                            <p>${person.socialTax}%</p>
                        </div>
                    </div>
                </div>
                <div class="col m-1 card p-3">
                    <div class="row">
                        <div class="col">
                            <p>Month</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Until ${person.tier}€:</p>
                        </div>
                        <div class="col-6">
                            <p>${person.tax}%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3 class="text-center">${person.gain}€</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-block btn-warning">New liquidated value</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-block btn-danger">Reset All</button>
                </div>
            </div>
        `;
    }
    showMessage(message, className){
        this.clearAlert();
        
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('#questions');
        const row = document.querySelector('form');

        container.appendChild(div, row);

        setTimeout(() => {
            this.clearAlert();
        },5000);

    }
    getFormValues(){

        const formValues = [
            this.name.value, 
            this.iliquid.value, 
            this.status.value, 
            this.children.value, 
            this.socialTax.value];

        return formValues;
    }
    lockInputs(){

        this.name.readOnly = true;
        this.iliquid.readOnly = true;
        this.status.setAttribute("disabled", true);
        this.children.setAttribute("disabled", true);
        this.socialTax.setAttribute("disabled", true);

        document.querySelector('#btnSubmit').readonly = true;
        //document.querySelector('#btnSubmit'). = true;
    }
    unlockInputs(){
 
        this.name.readOnly = false;
        this.iliquid.readOnly = false;
        this.status.setAttribute("disabled", false);
        this.children.setAttribute("disabled", false);
        this.socialTax.setAttribute("disabled", false);

        document.querySelector('#btnSubmit').readonly = false;
            
    }
    unlockInputIliquid(){

        this.iliquid.readOnly = false;

        document.querySelector('#btnSubmit').readonly = false;

    }
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    }
    clearOutput(){
        this.ouput.innerHTML = "";
    }
}



