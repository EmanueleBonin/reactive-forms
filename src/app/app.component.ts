import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { forbiddenNameValidator } from './shared/userName.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms';
  registrationForm : FormGroup;

  // getter del controllo
  get userName(){
    return this.registrationForm.get('userName');
  }
  // getter del controllo email
  get email(){
    return this.registrationForm.get('email');
  }

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]]
      , email: ['']
      , subscribe: [false]
      , password: ['']
      , confirmPassword: ['']
      , address: this.fb.group({
          city: ['']
          ,state: ['']
          ,postalCode: [''] 
      })
    }, {validator: PasswordValidator});    
    console.log('OnInit OK!');

    // applicazione della cross-vaidation tra il check subscribe e l'email che sarà obbligatoria se c'è la sottoscrizione
    // valueChanges è un observable
    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        console.log('Changed subscribe');        
        const email = this.registrationForm.get('email');     
        if (checkedValue){
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();          
        }
        // Aggiorna le validazioni sui controlli
        email.updateValueAndValidity();

      });
  } 
 
  // creazione modello della form tramite form builder
  /*
  registrationForm = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]]
        , password: ['']
        , confirmPassword: ['']
        , email: ['']
        , subscribe: [false]
        , address: this.fb.group({
            city: ['']
            ,state: ['']
            ,postalCode: ['']
        })
      }, {validator: PasswordValidator});
*/
  /*
  // costruzione "normale" reactive form 
  registrationForm = new FormGroup({
      userName: new FormControl('Emanuele'),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        state: new FormControl(''),
        postalCode: new FormControl('') 
      })
  });
  */
  loadApiData(mode){
    // setValue accetta un oggetto che fa match con la struttura
    // della form
    if(mode==1) { // setValue vuole l'intera struttura della form
      this.registrationForm.setValue({
        userName: 'Bruce',
        password: 'test',
        confirmPassword: 'test',
        address: {
          city: 'City',
          state: 'State',
          postalCode: '123456'
        }
      });
  
    } else { // patchValue si accontenta di una parte di essa
      this.registrationForm.patchValue({
        userName: 'Bruce Springsteen'
      });
  
    }
  }

}
