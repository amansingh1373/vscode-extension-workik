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
        case 'refresh':
        vscode.commands.executeCommand('chatExtension.refreshExtension')
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
                text-align: center;
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
            
            .overlay-container {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                z-index: 10;
                visibility: hidden;
            }
        
            .refresh {
                padding: 2rem 4rem 2rem 4rem;
                border: none;
                background-color: white;
                color: #161b1f;
                border-radius: 5px;
                font-size: 4rem;
                display:flex;
                align-items: center;
                gap: 4rem;
            }

            .refresh:hover {
                background-color: #161b1f;
                color: white;
                box-shadow: 5px 5px 10px #161b1f;
            }
            /*common styling*/
    
            .common-padding {
                padding: 2rem 4rem 2rem 4rem;
                margin-top: 3rem;
            }
    
            .partition-style {
                background-color: inherit;
                // box-shadow: -3px -3px 3px rgba(255, 255, 255, 0.125);
                box-shadow:  1px 1px 1px #1c232e,-1px -1px 1px #262f3e;
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
        <div class="chat-box">
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
            <div class="chat-container common-padding">
                Enter Your Query
            </div>
            <div class="chat-footer partition-style padding-chat-box box-shadow-chat-footer">
                <div class="chat-input-wrapper">
                    <input class="chat-input" size="1" type="text">
                    <label class="chat-button file-label" for="file">
                        <span class="material-symbols-outlined font-size-icon2 ">
                            attach_file
                        </span>
                    </label>
                    <input id="file" class="chat-button file" type="file">
                    <button class="chat-button submit" onclick="clickHandler()"> 
                        <span class="material-symbols-outlined font-size-icon2 ">
                            send
                        </span>
                    </button>
                </div>
            </div>
            <div class="overlay-container">
                <button class="refresh">
                    <span class="material-symbols-outlined">
                        refresh 
                    </span>
                    <div>refresh</div>
                </button>
                <p>Error💀</p>
            </div>    
        </div>
    </body>
    <script>
    const API_URL = 'http://localhost:3000/';
    const chatData = "";
    const vscode = acquireVsCodeApi();

    document.addEventListener('keydown', function(event) {
        const input = document.querySelector('.chat-input');
        if (event.key === 'Enter' && input === document.activeElement) {
            document.querySelector('.submit').click();
        }
    });
    
    document.querySelector('.refresh').addEventListener('click', () => {
        vscode.postMessage({
            command: 'refresh'
        });
    });


    function insertChatAIWrapper(imageSrc,data) {
        const chatAIWrapper = document.createElement('div');
        chatAIWrapper.classList.add('chat-AI-wrapper');

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');

        const img = document.createElement('img');
        img.classList.add('profile-image');
        img.src = imageSrc; // Keep the image source the same
        img.alt = 'avatar';

        avatarDiv.appendChild(img);

        const chatAIDiv = document.createElement('div');
        chatAIDiv.classList.add('chat-AI', 'chat');
        chatAIDiv.textContent = data;

        chatAIWrapper.appendChild(avatarDiv);
        chatAIWrapper.appendChild(chatAIDiv);

        const chatContainer = document.querySelector('.chat-container');
        chatContainer.appendChild(chatAIWrapper);
    }

    function insertChatHumanWrapper(imageSrc, data) {
        const chatHumanWrapper = document.createElement('div');
        chatHumanWrapper.classList.add('chat-human-wrapper');
    
        const chatHumanDiv = document.createElement('div');
        chatHumanDiv.classList.add('chat-human', 'chat');
        chatHumanDiv.textContent = data;
    
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');
    
        const img = document.createElement('img');
        img.classList.add('profile-image');
        img.src = imageSrc;
        img.alt = 'avatar';
    
        avatarDiv.appendChild(img);
    
        chatHumanWrapper.appendChild(chatHumanDiv);
        chatHumanWrapper.appendChild(avatarDiv);
    
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.appendChild(chatHumanWrapper);
    }
    

    function clickHandler() {
        const input = document.querySelector('.chat-input');
        const inputData = input.value;
        input.value = "";
        if(inputData === '') {
            return;
        }
        insertChatHumanWrapper("${imageSrc1}",inputData);
        const promise = fetch(API_URL);
        promise
        .then((res) => res.text())
        .then((data) => {
            insertChatAIWrapper("${imageSrc2}",data);
        })
        .catch((error) => {
            const overlayContainer = document.querySelector('.overlay-container');
            overlayContainer.style.visibility = 'visible';
        })
    }

    </script>
    </html>`;
  }
}

module.exports = MyWebviewViewProvider;
