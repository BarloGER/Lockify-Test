workspace {

    model {
        properties {
            "structurizr.groupSeparator" "/"
        }

        user = person "User" {
            description "A user of Lockify, with an account."
        }

        internalSoftwareSystem = softwareSystem "Lockify System" {
            tags "Internal"
            description "Allows users to securely view and save: Online-service-accounts, bank informations, notes and contacts."

            spa = container "Single-Page Application" {
                tags "SPA"
                technology "JavaScript/React"

                app = component "App" {
                    tags "SPA"
                    technology "Vite-React"
                    description "Entry Point"
                }

                group "Context" {
                    authContext = component "Auth Context" {
                        tags "SPA" "Context"
                        technology "React/Context"
                        description "Checks if the user is authenticated."
                    }

                    dataVaultContext = component "Data Vault Context" {
                        tags "SPA" "Context"
                        technology "React/Context"
                        description "Gets and decrypts data-vault data. Resets master-password after 5 minutes inactivity."
                    }

                    designContext = component "Design Context" {
                        tags "SPA" "Context"
                        technology "React/Context"
                        description "Provides design-provider as wrapper for app routes, to select between light and dark design."
                    }
                }

                landingPage = component "Landing Page" {
                    tags "SPA" "Page"
                    description "Home Page with informations about the application."
                }

                authenticationPage = component "Authentication Page" {
                    tags "SPA" "Page"
                    description "Allows user to login, using a login-form."
                }

                registerPage = component "Register Page" {
                    tags "SPA" "Page"
                    description "Allows the user to register, using the register-form."
                }

                userProfilePage = component "User Profile Page" {
                    tags "SPA" "Page"
                    description "Allows the user to edit his user account and access settings."
                }

                forgotPasswordPage = component "Forgot Password Page" {
                    tags "SPA" "Page"
                    description "Allows the user to request a new password."
                }

                verificationPage = component "Verification Page" {
                    tags "SPA" "Page"
                    description "Allows the user to confirm his email-address."
                }

                supportPage = component "Support Page" {
                    tags "SPA" "Page"
                    description "Allows the user to contact the support."
                }

                blockedPage = component "Blocked Page" {
                    tags "SPA" "Page"
                    description "Shows blocked users a support contact-form."
                }
            
                dataVaultPage = component "Data Vault Page" {
                    tags "SPA" "Page"
                    description "Allows the user to access his data-vault."
                }

                dashboardPage = component "Dashboard Page" {
                    tags "SPA" "Page"
                    description "Shows the user detailed security informations."
                }

                accountsPage = component "Accounts Page" {
                    tags "SPA" "Page"
                    description "Allows the user to read, create, update and delete accounts."
                }

                banksPage = component "Banks Page" {
                    tags "SPA" "Page"
                    description "Allows the user to read, create, update and delete bank-accounts."
                }

                contactsPage = component "Contacts Page" {
                    tags "SPA" "Page"
                    description "Allows the user to read, create, update and delete contacts."
                }

                notesPage = component "NotesPage" {
                    tags "SPA" "Page"
                    description "Allows the user to read, create, update and delete notes."
                }

                group "Interactor" {
                    accountInteractorF = component "Account Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }

                    bankInteractorF = component "Bank Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }

                    contactInteractorF = component "Contact Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }

                    cryptographyInteractorF = component "Cryptography Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, encrypts/decrypts data."
                    }

                    mailInteractorF = component "Mail Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }

                    noteInteractorF = component "Note Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }

                    userInteractorF = component "User Interactor" {
                        tags "SPA" "Interactor"
                        description "Validates data against entity, executes use-cases and makes api calls."
                    }
                }
            }

            api = container "API Application" {
                tags "API"
                technology "JavaScript/ExpressJS"

                group "Middlewares" {
                    requestMiddleware = component "Middleware: Validate Request Metadata" {
                        tags "API" "Middleware"
                        technology "ExpressJS Middleware"
                        description "Splites every incoming request in headers, params and query to validate it seperately. Body is validated later."
                    }
                    
                    sessionMiddleware = component "Middleware: Validate Session" {
                        tags "API" "Middleware"
                        technology "ExpressJS Middleware"
                        description "Validates Session"         
                    }
                }
                
                group "Account Components" {
                    accountController = component "Account Controller" {
                        tags "API" "Controller"
                        description "Allows user to read, create, update and delete accounts"
                    }

                    accountInteractor = component "Account Interactor" {
                        tags "API" "Interactor"
                        description "Validates body against entity and executes use-cases"
                    }
                }
                
                group "Bank Components" {
                    bankController = component "Bank Controller" {
                        tags "API" "Controller"
                        description "Allows user to read, create, update and delete bank accounts"
                    }

                    bankInteractor = component "Bank Interactor" {
                        tags "API" "Interactor"
                        description "Validates body against entity and executes use-cases"
                    }
                }

                group "Contact Components" {
                    contactController = component "Contact Controller" {
                        tags "API" "Controller"
                        description "Allows user to read, create, update and delete contacts"
                    }

                    contactInteractor = component "Contact Interactor" {
                        tags "API" "Interactor"
                        description "Validates body against entity and executes use-cases"
                    }
                }

                group "Note Components" {
                    noteController = component "Note Controller" {
                        tags "API" "Controller"
                        description "Allows user to read, create, update and delete notes"
                    }

                    noteInteractor = component "Note Interactor" {
                        tags "API" "Interactor"
                        description "Validates body against entity and executes use-cases"
                    }
                }

                group "User Components" {
                    userController = component "User Controller" {
                        tags "API" "Controller"
                        description "Allows user to read, create, update and delete their account and also to reset their password or validate their email."
                    }

                    userInteractor = component "User Interactor" {
                        tags "API" "Interactor"
                        description "Validates body against entity and executes use-cases"
                    }
                }

                
                mailInteractor = component "Mail Interactor" {
                    tags "API" "Interactor"
                    description "Validates body against entity and executes use-cases"
                }
            }

            db = container "Database" {
                tags "DB"
                technology "PostgreSQL"
            } 
        }

        externalSoftwareSystem = softwareSystem "E-mail API" {
            tags "External"
            description "An external API."
        }

        // Level 1 System Context Diagram1
        internalSoftwareSystem -> externalSoftwareSystem "Sends mail data to"
        
        // Level 2 Container Diagram2
        spa -> externalSoftwareSystem "Sends support form data" "JSON/HTTPS"
        api -> externalSoftwareSystem "Send mail data" "JSON/HTTPS"
        externalSoftwareSystem -> user "Sends e-mail to"

        user -> spa "Views and saves securely encrypted informations using"
        spa -> api "Makes API calls to" "JSON/HTTPS"
        api -> db "Reads from and writes to" "SQL/TCP"

        // Level 3 Component Diagram3
        spa -> requestMiddleware "Make API call" "JSON/HTTPS"
        requestMiddleware -> sessionMiddleware "Passes valid request to"
        sessionMiddleware -> accountController ""
        sessionMiddleware -> bankController ""
        sessionMiddleware -> contactController ""
        sessionMiddleware -> noteController ""
        sessionMiddleware -> userController ""

        accountController -> accountInteractor "Passes unvalidated body to"
        accountInteractor -> db "Reads from, writes to" "Sequelize"

        bankController -> bankInteractor "Passes unvalidated body to"
        bankInteractor -> db "Reads from, writes to" "Sequelize"

        contactController -> contactInteractor "Passes unvalidated body to"
        contactInteractor -> db "Reads from, writes to" "Sequelize"

        noteController -> noteInteractor "Passes unvalidated body to"
        noteInteractor -> db "Reads from, writes to" "Sequelize"

        userController -> userInteractor "Passes unvalidated body to"
        userInteractor -> db "Reads from, writes to" "Sequelize"
        userInteractor -> mailInteractor "Sends mail data to"

        mailInteractor -> externalSoftwareSystem "Sends mail data to using" "JSON/HTTP"    

        // Level 3 Component "Diagram4"
        app -> landingPage "Renders first component"

        dataVaultContext -> accountsPage "Uses context"
        authContext -> authenticationPage "Uses context"
        dataVaultContext -> banksPage "Uses context"
        authContext -> blockedPage "Uses context"
        dataVaultContext -> contactsPage "Uses context"
        dataVaultContext -> dashboardPage "Uses context"

        authContext -> dataVaultPage "Uses context"
        dataVaultContext -> dataVaultPage "Uses context"

        authContext -> forgotPasswordPage "Uses context"
        dataVaultContext -> notesPage "Uses context"
        authContext -> registerPage "Uses context"
        authContext -> supportPage "Uses context"
        authContext -> userProfilePage "Uses context"
        authContext -> verificationPage "Uses context"
        

        accountsPage -> accountInteractorF "Sends unvalidated data to"
        accountsPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        authenticationPage -> userInteractorF "Sends unvalidated data to"
        banksPage -> bankInteractorF "Sends unvalidated data to"
        banksPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        blockedPage -> mailInteractorF "Sends unvalidated data to"
        contactsPage -> contactInteractorF "Sends unvalidated data to"
        contactsPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        dashboardPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        dataVaultPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        forgotPasswordPage -> userInteractorF "Sends unvalidated data to"
        notesPage -> noteInteractorF "Sends unvalidated data to"
        notesPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        registerPage -> userInteractorF "Sends unvalidated data to"
        registerPage -> cryptographyInteractorF "Encrypts/Decrypts data using"
        supportPage -> mailInteractorF "Sends unvalidated data to"
        userProfilePage -> userInteractorF "Sends unvalidated data to"
        verificationPage -> userInteractorF "Sends unvalidated data to"

        accountInteractorF -> api "Makes API calls to" "JSON/HTTPS
        bankInteractorF -> api "Makes API calls to" "JSON/HTTPS
        contactInteractorF -> api "Makes API calls to" "JSON/HTTPS
        noteInteractorF -> api "Makes API calls to" "JSON/HTTPS
        userInteractorF -> api "Makes API calls to" "JSON/HTTPS
        mailInteractorF -> externalSoftwareSystem "Sends mail data to" "JSON/HTTPS"
    }

    views {
        systemContext internalSoftwareSystem "Diagram1" {
            include *
        }

        container internalSoftwareSystem "Diagram2" {
            include *
        }     

        component api "Diagram3" {
            include *
        }

        component spa "Diagram4" {
            include *
        }

        styles {
            element "Element" {
                color white
            }
            element "Person" {
                shape Person
                background #005db5
            }
            element "Internal" {
                background #0084ff
            }
            element "External" {
                background #626363
            }
            element "SPA" {
                shape WebBrowser
                background #0084ff
            }
            element "API" {
                shape RoundedBox
                background #02c71c     
            }
            element "DB" {
                shape Cylinder
                background #bf0502
            }
            element "Middleware" {
                shape Pipe
            }
            element "Controller" {
                shape Component
            }
            element "Interactor" {
                shape Hexagon
            }
            element "Port" {
                shape Diamond
            }
            element "Entity" {
                shape Robot
            }
            element "Repository" {
                shape Folder
            }
            element "Presenter" {
                shape Ellipse
            }
            element "Unused" {
                background #626363
            }
            element "Page" {
                shape RoundedBox
            }
        }
    }
}
