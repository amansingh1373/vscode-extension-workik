const vscode = require('vscode');
const path = require('path');

class MyWebviewViewProvider {
  /**
   * @param {vscode.ExtensionContext} context
   */
  constructor(context) {
    this.context = context;
  }

  resolveWebviewView(webviewView, context, _token) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'media'))]
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.command) {
        case 'alert':
          vscode.window.showInformationMessage(message.text);
          break;
      }
    });
  }

  getWebviewContent(webview) {
    const imagePath1 = vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'your-image.jpg'));
    const imageSrc1 = webview.asWebviewUri(imagePath1);
    const imagePath2 = vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'student.jpg'));
    const imageSrc2 = webview.asWebviewUri(imagePath2);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <title>Side Panel View</title>
        <style>
            /*google icon styles*/
            .material-symbols-outlined {
                font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
            }
    
            html,body {
                margin: 0;
                height: 100%;
                font-size: 1vw;
                box-sizing: border-box;
            }
    
            .chat-box {
                height: 100%;
                display: flex;
                font-size: 4rem;
                flex-direction: column;
                background-color: inherit;
                box-sizing: border-box;
            }
    
            .chat-header {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                gap: 5rem;
                color: white;
            }
    
            .logo {
                background-color: white;
                color: #02060D;
                border-radius: 5px;
                padding: 1rem;
            }
    
            .chat-container {
                flex: 1;
                overflow: auto;
            }
    
            .chat-footer {
                flex: 0 0 auto;
                color: white;
            }
    
            .chat-input-wrapper {
                display: flex;
                align-items: center;
            }
            
            .chat-input {
                flex: 1 0 auto;
                background-color: white;
                outline: none;
                border: none;
                border-radius: 8px;
                padding: 3rem;
                margin: 1rem;
                font-size: 4rem;
                color: #161b1f;
            }
    
            .chat-button {
                flex:0 0 auto;
                border: none;
                background-color: transparent;
                color: white;
            }
    
            .submit {
                font-size: 4rem;
                background-color: white;
                border-radius: 8px;
                padding: 3rem;
                margin: 1rem;
                color: #161b1f;
            }
            
            .file {
                opacity: 0;
                width: 0%;
            }
    
            .file-label {
                font-size: 4rem;
                background-color: white;
                border-radius: 8px;
                padding: 3rem;
                margin: 1rem;
                color: #161b1f;
            }
    
            .font-size-icon {
                font-size: 5rem;
            }
            .font-size-icon2 {
                font-size: 4rem;
            }
    
            .chat-AI-wrapper {
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
            
            }
            .chat-human-wrapper {
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
            
            }
            .chat-AI {
                text-align: left;
            }
    
            .chat-human {
                text-align: right;
            }
            .avatar {
                margin: 0.5rem;
            }
            .profile-image {
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                object-fit: cover;
            }
    
            /*common styling*/
    
            .common-padding {
                padding: 2rem 4rem 2rem 4rem;
            }
    
            .partition-style {
                background-color: #070A0D;
                box-shadow: 5px 5px 10px #161b1f, -2px -2px 2px rgba(255, 255, 255, 0.275);
                border-radius: 10px;
                padding: 3rem;
                margin: 1rem;
                margin-top: 3rem;
            }
    
            .padding-chat-box {
                padding: 1rem;
            
            }
    
            .firstStack{
                z-index: 10;
            }
    
            .secondStack {
                z-index: 5;
            }
    
            .chat {
                max-width: 75%;
                background-color: white;
                color: #212a31; 
                border-radius: 5px;
                padding: 2rem;
                margin: 2rem 1rem 2rem 1rem;
            }
    
        </style>
    </head>
    <body>
        <div class="chat-box common-padding">
            <div class="chat-header partition-style ">
                <div class="logo">
                    <span class="material-symbols-outlined  font-size-icon">
                        chat_bubble
                    </span>
                </div>
                <div class="logo-heading">
                    Chat App
                </div>
            </div>
            <div class="chat-container partition-style">
                <div class="chat-human-wrapper">
                    <div class="chat-human chat">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, unde?
                    </div>
                    <div class="avatar">
                        <img class="profile-image" src=${imageSrc1} alt="avatar" />
                    </div>
                </div>
                <div class="chat-AI-wrapper">
                    <div class="avatar">
                        <img class="profile-image" src=${imageSrc2} alt="avatar" />
                    </div>
                    <div class="chat-AI chat">
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsum at recusandae dicta eveniet amet esse? Perferendis beatae corrupti eligendi?
                    </div>
                </div>
                
            </div>
            <div class="chat-footer partition-style padding-chat-box">
                <div class="chat-input-wrapper">
                    <input class="chat-input" size="1" type="text">
                    <label class="chat-button file-label" for="file">
                        <span class="material-symbols-outlined font-size-icon2 ">
                            attach_file
                        </span>
                    </label>
                    <input id="file" class="chat-button file" type="file">
                    <button class="chat-button submit"> 
                        <span class="material-symbols-outlined font-size-icon2 ">
                            send
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </body>
    <script>
    
    </script>
    </html>`;
  }
}

module.exports = MyWebviewViewProvider;
