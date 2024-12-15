import { Component } from '@angular/core';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';

  constructor() {
    this.initGoogleSignIn();
  }


  signIn(event:any){
    console.log('some data', event);
  }

  signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  }

  initGoogleSignIn(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '462068634772-l8n75472f4q373msfq8g9pgu4dvhtg2v.apps.googleusercontent.com', // Replace with your actual client ID
      });
    });
  }

  openGoogleSignInTab(): void {
    const auth2 = gapi.auth2.getAuthInstance();

    // Create a new tab
    const newTab = window.open('', '_blank');

    // Handle sign-in in the new tab
    auth2.signIn().then((googleUser:any) => {
      this.handleSignInSuccess(googleUser, newTab);
    }).catch((error:any) => {
      console.log('error is : ', error)
      this.handleSignInFailure(error, newTab);
    });
  }

  handleSignInSuccess(googleUser:any, newTab:any): void {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;

    // Optionally, you can send the idToken to your server to validate the login.
    newTab.document.body.innerHTML = `
      <h2>Sign-in Successful</h2>
      <p>Name: ${profile.getName()}</p>
      <p>Email: ${profile.getEmail()}</p>
      <p>Token: ${idToken}</p>
    `;
  }

  handleSignInFailure(error:any, newTab:any): void {
    newTab.document.body.innerHTML = `
      <h2>Sign-in Failed</h2>
      <p>Error: ${error.error}</p>
    `;
  }

}
