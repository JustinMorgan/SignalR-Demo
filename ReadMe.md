#SignalR DevSession, 2014-07-30

This repo contains demo code and PowerPoint slides for my DevSession on SignalR. The code was partly built on the "ASP.NET MVC5 with Bootstrap 3.1.1 LESS" template available online, and contains a few drop-ins, including:

- Angular.js
- Twitter Bootstrap
- LESS
- A small MVC5 REST API

There are two main demo apps: Blocks and Feeds. 

- Blocks is a simple real-time block-dragging app implemented in both the Hub and Persistent Connection styles. 
- Feeds is a more involved application that simulates multiple users posting to the same feed at once. It uses Angular, Bootstrap, LESS, and wraps SignalR in a familiar jQuery-style event-handling pattern.

This repo contains demo code and PowerPoint slides for my DevSession on SignalR. The code was partly built on the "ASP.NET MVC5 with Bootstrap 3.1.1 LESS" template available online, and contains a few drop-ins, including:

- Angular.js
- Twitter Bootstrap
- LESS
- A small MVC5 REST API

#Presentation Notes

Below are my presentation notes, which closely follow the slides.

##Options for async messaging

- AJAX
    - Request/response model
    - Usually means interval polling
        - High overhead in cycles and bandwidth
        - High latency
        - Wasted calls if there's nothing to transmit
    - Lots of code, coupling, overhead
- JSON via Web API/REST 
    - Less overhead
    - Request/response model   
    - Still doesn't solve polling issue 
- WebSockets
    - Direct connection between client and server
    - Uses long polling to keep connections alive
        - Connection stays open until it times out
        - Less overhead than interval-polling

##Enter SignalR

- Pub/sub model instead of request/response
- Uses WebSockets, which means long polling
    - Degrades gracefully to HTTP in older browsers
- Small, dynamic code 
    - Advantages for RAD
- Loose coupling
- Automagically serializes to/from JSON
- Built on top of OWIN
- Allows grouping of connections/users
- Support for web, iOS, Android, C#, and other clients

##SignalR setup: It's fast and easy

- Server side
    - Pull down SignalR from NuGet
    - Implement Hub class
- Client side
    - Open a connection
    - Bind event handlers
    - Start publishing events

##Hub vs Persistent Connection

- Not many advantages to PC over hub. Use PC in the following circumstances (from documentation):
    - The format of the actual message sent needs to be specified.
    - The developer prefers to work with a messaging and dispatching model rather than a remote invocation model.
    - An existing application that uses a messaging model is being ported to use SignalR.

##Performance

- Generally good performance compared to other client/server messaging types
- Allows 5000 concurrent requests per CPU by default
    - Can be configured
- When request limit exceeded, server starts throttling requests with a queue
- SignalR team offers SignalR.Crank tool to generate testing load

##Security

- Initial authentication/authorization as normal
- Pass connection ID and username back and forth
    - Connection ID is randomly generated and persists for the entire connection
    - Uses encryption and digital signing
- Protects against Cross-Site Request Forgery (CSRF)
- Can transport using SSL

##Conclusion: Why care about async?

- Frees us to innovate
- Easy adoption
    - Coding is quick and easy
    - Matches our pub/sub pattern
        - Good conceptual fit with NServiceBus
        - Several discussions available about SignalR + NSB, SignalR + eventual consistency, etc.
    - Plays nicely with jQuery, angular, etc.
    - Easy abstraction to jQuery-style events, options for durable messaging

#Links/Further Reading

##Overview

- [SignalR project and wiki](https://github.com/SignalR/SignalR) 
- [Official SignalR site](http://www.asp.net/signalr) 
- [Why should ASP.NET developers consider SignalR for ALL projects?](http://kevgriffin.com/why-should-asp-net-developers-consider-signalr-for-all-projects/)
- [MVC controller actions vs Web API vs SignalR – what to use?](http://blogs.perficient.com/microsoft/2014/02/mvc-controller-actions-vs-web-api-vs-signalr-what-to-use/)

##Implementation, concepts, and tutorials
- [Quickstart](http://www.asp.net/signalr/overview/signalr-20/getting-started-with-signalr-20/tutorial-getting-started-with-signalr-20-and-mvc-5)
- [Long Polling and SignalR](http://msdn.microsoft.com/en-us/magazine/hh882442.aspx)
- [Why choose Hub vs. Persistent Connection?](http://stackoverflow.com/q/9280484/399649)

##Mobile
- [How To Use SignalR in iOS and Android Apps](http://visualstudiomagazine.com/articles/2013/11/01/how-to-use-signalr-in-ios-and-android-apps.aspx)

##NServiceBus, durable messaging, and eventual consistency:
- [CQRS Event Sourcing pattern with NServiceBus, ASP.NET MVC and SignalR](http://www.codeproject.com/Articles/685278/CQRS-Event-Sourcing-pattern-with-NServiceBus-ASP-N)
- [NServiceBus and SignalR](http://jasondentler.com/blog/2012/02/nservicebus-and-signalr/)
- [An NServiceBus Backplane for SignalR](http://roycornelissen.wordpress.com/2013/03/11/an-nservicebus-backplane-for-signalr/)

##Performance
- [Performance Tuning SignalR](https://github.com/SignalR/SignalR/wiki/Performance)

##Security
- [Introduction to SignalR Security](http://www.asp.net/signalr/overview/signalr-20/security/introduction-to-security)
