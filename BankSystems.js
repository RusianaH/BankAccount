    // class BankAccount
   class BankAccount {
    constructor(saldo) {
        this.saldo = 0;
    }

    // membuat method settimeout
    await (ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Method deposit dari class BankAccount
    async deposit (amount) {
        if(isNaN(amount)){
            alert('input a number!')
            return amount;
        }
         // menerapkan try cacth untuk memberitahu pesan error saat kondisi false
        try { 
            if (amount > 10000) {
            this.saldo += amount;
            this.showsaldo();
            alert(`Deposit: ${amount}`);
            await this.await(1000);
            alert(`generate to input deposite....`)
            alert (`deposti telah masuk Rp.${this.saldo}`)
           
        }  else{
            throw new Error (`Invalid Number! masukkan Minimal Rp.10.000`)
        }
        } catch (error) {
            alert(error.message)
        }  
        }

    // Method withdraw dari class bankAccount
   async withdraw(amount) {
        if(isNaN(amount)){
            alert('input a number!')
            return amount;
        }
        // menerapkan try cacth untuk memberitahu pesan error saat kondisi false
        try { 
            if (amount > 0 && amount <= this.saldo) {
                this.saldo -= amount;
                this.showsaldo();
                console.log(`Withdraw: ${amount}`);
                await this.await(1000);
                alert(`generate....`)
                alert (`saldo anda sebesar Rp.${this.saldo}`)

           
        }  else{
            throw new Error (`Saldo anda melebihi batas!`)
        }
        } catch (error) {
            alert(error.message)
        }
    }

    // Metode untuk memperbarui tampilan saldo pada halaman HTML
    showsaldo() {
        document.getElementById('saldo').textContent = this.saldo;
    }
}

// inheritance untuk class btn dari class parents "bankAccount"
class BankSystem extends BankAccount {
    constructor() {
        super(saldo);
    }
    // method class button
    deposit = () => {
        const depositAmount = parseFloat(prompt('masukkan jumlah deposit :'));
        // memanggil method deposit dari class parent "bankAccount"
        super.deposit(depositAmount)
    }
    // method class Button
    withdraw = () => {
        const withdrawAmount = parseFloat(prompt('Masukkan jumlah penarikan anda:'));
         // memanggil method withdraw dari class parent "bankAccount"
        super.withdraw(withdrawAmount);
    }
}
// inisiasi class parents & Child
const acc = new BankAccount();
const system = new BankSystem();


