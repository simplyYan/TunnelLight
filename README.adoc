= TunnelLight Library

TunnelLight is a JavaScript library designed to enhance the security of your web applications by providing protection against various common web attacks. This library includes functions to protect your web application from Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Clickjacking, Man-in-the-Middle, Phishing, Session Hijacking, DDoS, Brute Force, Directory Traversal, Remote File Inclusion, and Local File Inclusion attacks.

== Installation

To use TunnelLight in your project, include it in your HTML file like this:

[source,html]
----
<script src="https://cdn.jsdelivr.net/gh/NervousGroove/TunnelLight@main/tnlt.js"></script>
----

== Usage

After including TunnelLight in your project, you can start using its functions to enhance the security of your web application. Here are some examples:

=== XSS Protection

The `tunli.xss` function sanitizes user input to protect against XSS attacks.

[source,javascript]
----
const userInput = '<script>alert("XSS attack!");</script>';
const sanitizedInput = tunli.xss(userInput);
----

=== CSRF Protection

The `tunli.csrf` function adds a CSRF token to AJAX requests to protect against CSRF attacks.

[source,javascript]
----
const csrfToken = 'your_csrf_token';
const addCSRFToRequest = tunli.csrf(csrfToken);
const xhr = new XMLHttpRequest();
addCSRFToRequest(xhr);
// Make your AJAX request
----

=== Clickjacking Protection

The `tunli.click` function adds a Content Security Policy (CSP) header to protect against Clickjacking attacks.

=== Man-in-the-Middle Protection

The `tunli.mitm` function ensures that your application is accessed over HTTPS to protect against Man-in-the-Middle attacks.

=== Phishing Protection

The `tunli.phi` function checks if the current domain matches the expected domain and redirects to the expected domain using HTTPS if necessary to protect against Phishing attacks.

=== Session Hijacking Protection

The `tunli.hij` function regenerates the session ID after login to protect against Session Hijacking attacks.

=== DDoS Protection

The `tunli.ddos` function implements a rate limit for user requests to protect against DDoS attacks.

=== Brute Force Protection

The `tunli.brute` function implements a login attempt limit to protect against Brute Force attacks.

=== Directory Traversal Protection

The `tunli.dir` function removes dangerous characters from a file path to protect against Directory Traversal attacks.

=== Remote File Inclusion Protection

The `tunli.rfi` function checks if a URL is on the same domain to protect against Remote File Inclusion attacks.

=== Local File Inclusion Protection

The `tunli.lfi` function checks if a file path is within the root directory to protect against Local File Inclusion attacks.

== Contributing

Contributions to the TunnelLight library are welcome. If you have suggestions, bug reports, or would like to contribute code, please open an issue or create a pull request on the GitHub repository.

== License

TunnelLight is released under the MIT License. See the [LICENSE](LICENSE) file for details.

This concludes the README for the TunnelLight library. Use these functions to enhance the security of your web applications and protect against common web attacks.
