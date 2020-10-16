const component = {};

component.registerPage = `
<div class="register-container">
<form id="register-form">
  <div class="register-header">REGISTER</div>
  
  <div class="input-wrapper form-group">
    <input type="text" class="form-control" placeholder="Username" name="userName"/>
    <div class="error" id="user-name-error"></div>
  </div>
  <div class="input-wrapper form-group">
    <input type="email" class="form-control" placeholder="Email" name="email"/>
    <div class="error" id="email-error"></div>
  </div>
  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Password" name="password"/>
    <div class="error" id="password-error"></div>
  </div>
  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Confirm Password" name="confirmPassword"/>
    <div class="error" id="confirm-password-error"></div>
  </div>
  <div class="form-action input-wrapper">
    <button class="btn btn-primary btn-register cursor-pointer" type="submit">Register</button>
    <div class="redirect">Already have an account?
      <span id="redirect-to-login" class="cursor-pointer">Login</span>
    </div>
  </div>
</form>
</div>
`;

component.loginPage = `
<div class="login-container">
<form id="login-form">
  <div class="login-header">LOGIN</div>
  <div class="input-wrapper form-group">
    <input type="email" class="form-control" placeholder="Email" name="email"/>
    <div class="error" id="email-error"></div>
  </div>
  <div class="input-wrapper form-group">
    <input type="password" class="form-control" placeholder="Password" name="password"/>
    <div class="error" id="password-error"></div>
  </div>
  <div class="form-action input-wrapper">
    <button class="btn btn-primary btn-login cursor-pointer" type="submit">Login</button>
    <div class="login-by-social-account">
      <div class="text"><span>Or login with</span></div>
      <div class="btn-social-acc">
        <button id="btn_google"><i class="fab fa-google"></i> Google </button>
        <button id="btn_facebook"><i class="fab fa-facebook-square"></i> Facebook </button>
      </div>
    </div>
    
    <div class="redirect">Don't have an account?
      <span id="redirect-to-register" class="cursor-pointer">Register</span>
    </div>
  </div>
</form>
</div>
`;
