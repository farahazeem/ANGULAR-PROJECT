import { AbstractControl } from "@angular/forms";

export const PasswordMatchValidator = (passwordControlName: string,
  confirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => { //creating another function here
      const passwordControl = form.get(passwordControlName); //by using form.get() method u can find a control inside a form
      const confirmPasswordControl = form.get(confirmPasswordControlName);

      if(!passwordControl || !confirmPasswordControl) return; //normally it cannot happen since controls will always there
      //But we write this line for safer code to bypass any compiler errors

      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({notMatch: true}); //setting a new error called notMatch on confirmPasswordControl
      } else {
        const errors = confirmPasswordControl.errors;
        if(!errors) return; //no error then return since we have nothing to delete

        delete errors.notMatch; //otherwise delete the error using the delete keyword (we can delete a property of an object)
        confirmPasswordControl.setErrors(errors);
      }
    }
    return validator; // here we are passing the whole validator function to
  }
