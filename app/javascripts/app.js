// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import Web3 from 'web3';
import {default as contract} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import tokenerc20_artifacts from '../../build/contracts/TokenERC20.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var TokenERC20 = contract(tokenerc20_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
    start: function () {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        MetaCoin.setProvider(web3.currentProvider);
        TokenERC20.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];


            self.refreshBalance();
        });
    },

    setStatus: function (message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },

    refreshBalance: function () {
        var self = this;

        var meta;
        MetaCoin.deployed().then(function (instance) {
            meta = instance;
            return meta.getBalance.call(account, {from: account});
        }).then(function (value) {
            console.log(value)
            var balance_element = document.getElementById("balance");
            balance_element.innerHTML = value.valueOf();

            console.log('当前账户', account);

        }).catch(function (e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });

        TokenERC20.deployed().then(function (o) {
            return o.getBalance.call(account, {from: account})
        }).then(function (value) {
            console.log('当前余额LMW', web3.fromWei(value.toString(), 'ether'));
        })
    },

    sendCoin: function () {
        var self = this;

        var amount = parseInt(document.getElementById("amount").value);
        var receiver = document.getElementById("receiver").value;

        this.setStatus("Initiating transaction... (please wait)");

        var meta;
        MetaCoin.deployed().then(function (instance) {
            meta = instance;
            return meta.sendCoin(receiver, amount, {from: account});
        }).then(function () {
            self.setStatus("Transaction complete!");
            self.refreshBalance();
            db();
        }).catch(function (e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });


        function db() {
            TokenERC20.deployed().then(function (o) {
                return o.transfer(receiver, web3.toWei(amount), {from: account});
            }).then(function (value) {
                self.setStatus("代币 complete!");
                self.refreshBalance();
            }).catch(function (e) {
                console.log(e);
                self.setStatus("代币 Error sending coin; see log.");
            });
        }
    }
};

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }

    App.start();
});
