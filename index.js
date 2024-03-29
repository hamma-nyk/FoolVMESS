const chalk = require('chalk')
const figlet = require('figlet')
const request = require('request');
const prompt = require("prompt-sync")({ sigint: false });
const line = "---------------------------------------------------";
var pass = "";
function title() {
    console.clear()
    console.log(chalk.bold.green(figlet.textSync('FoolVMESS', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: false
        })
    ))
    console.log(chalk.red("Credit: http://fool.azurewebsites.net/"));
}

function doRequest(country,tls,BugHost) {
    if (country!=null){
        var urlP = `http://fool.azurewebsites.net/get?vpn=vmess&network=ws&mode=cdn&tls=${tls}&cc=${country}&pass=${pass}`
    }else{
        var urlP = `http://fool.azurewebsites.net/get?vpn=vmess&network=ws&mode=cdn&tls=${tls}&pass=${pass}`    
    }
    return new Promise(function (resolve, reject) {
        request.get({
            url:    urlP
        }, function(error, response, body){
            if (!error && response.statusCode === 200) {
                console.clear();
                title();
                const VPNList = JSON.parse(body)
                if (tls=="1"){
                    var tlsStatus = "true";
                }else{
                    var tlsStatus = "false";
                }
                console.log(chalk.bold.yellow("proxies:"));
                for (let i in VPNList){
                    console.log(chalk.bold.cyan(`  # VMESS [${parseInt(i)+1}] [${VPNList[i].region}] [${VPNList[i].country_code}] [${VPNList[i].org}]`));
                    console.log(`  - name: ${VPNList[i].remark}
    server: ${BugHost}
    port: ${VPNList[i].server_port}
    type: ${VPNList[i].vpn}
    uuid: ${VPNList[i].uuid}
    alterId: 0
    cipher: auto
    tls: ${tlsStatus}
    skip-cert-verify: true
    servername: ${VPNList[i].host}
    network: ${VPNList[i].transport}
    ws-opts:
      path: ${VPNList[i].path}
      headers:
        Host: ${VPNList[i].host}
    udp: true`)
                }
                resolve(body);
                console.log(chalk.bold.yellow(line));
                const back = prompt("Back to menu? (y/n) : ");
                if(back=="y"){
                    start();
                }else if(back=="n"){
                    console.log("Bye.")
                }
            }else{
                reject(error);
            }
        })
    })
}

function randomChoice(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    console.log(chalk.cyan(`Edukasi : 104.17.2.81 / 104.17.3.81
Game    : 104.18.21.94
You can input your bug host too...`))
    var BugHost = prompt("Bug host/IP) : ");
    console.log(chalk.bold.yellow(line));
    var tls     = prompt("TLS (1/0)    : ");
    var country = null;
    doRequest(country,tls,BugHost);
}

function customChoice(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    console.log(chalk.cyan(`Edukasi : 104.17.2.81 / 104.17.3.81
Game    : 104.18.21.94
You can input your bug host too...`))
    var BugHost = prompt("Bug host/IP) : ");
    console.log(chalk.bold.yellow(line));
    console.log(`${chalk.cyan(`SG : Singapore
ID : Indonesia
US : United States`)}
${chalk.green("Visit website for all list.")}`)
    var country = prompt("Country Code : ");
    console.log(chalk.bold.yellow(line));
    var tls     = prompt("TLS (1/0)    : ");
    doRequest(country,tls,BugHost);
}
function userPass(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    pass = prompt("Input Password : ")
    console.clear()
}
function start(){
    title();    
    console.log(chalk.bold.yellow(line));
    console.log('[1] Random Vmess (WS & CDN)')
    console.log('[2] Custom Country Vmess (WS & CDN)')
    console.log('[3] Exit')
    console.log(chalk.bold.yellow(line));
    const choose = prompt("Choose Menu : ");
    if(choose=="1"){
        userPass();
        randomChoice();
    }else if(choose=="2"){
        userPass();
        customChoice();    
    }else if(choose=="3"){
        console.clear();
        title();
        console.log("Bye.")        
    }
}

start()
