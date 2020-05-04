import { AbstractControl } from "@angular/forms";

// Validazione della password 
// al validator posso passare un solo parametro, quindi questa validazione va fatta alivello diform
// in modo da poter reperire i vari valori della form che mi interessano per la validazione
export function PasswordValidator(control: AbstractControl): {[key: string]: boolean}|null{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine){
        return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ?  {'misMatch': true}: null;
}