import { AbstractControl, ValidatorFn } from "@angular/forms";

// i validators possono tornare due valori dipendentemente se la validazione passa o meno
// se la validazione fallisce viene passata un oggetto con una chiave stringa assieme ad un valore di tipo any
// se la validazione passa allora viene ritornato null
/*
// validator senza parametri
export function forbiddenNameValidator(control: AbstractControl): {[key: string]:any} | null{
    // esegue un controllo della regular espression /admin/ con il control.value
    const forbidden = /admin/.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;

}
*/
// validator con parametri
export function forbiddenNameValidator(forbiddenName: RegExp):ValidatorFn { return (control: AbstractControl): {[key: string]:any} | null =>{
        // esegue un controllo della regular espression /admin/ con il control.value
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    }
}