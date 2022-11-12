class action{
    constructor(action){
        this.action = action
        this.outcome = null
        this.reason = null
        this.data = null
    }
    
    // DO NOT ACCESS
    getSuccess(){
        return {
            action: this.action,
            outcome: this.outcome,
            data: this.data
        }
    }
    getFailure(){
        return {
            action: this.action,
            outcome: this.outcome,
            reason: this.reason
        }
    }
    
    // ACCESS
    setSuccess(data){
        this.outcome = true
        this.data = data
    }
    setFailure(reason){
        this.outcome = false
        this.reason = reason
    }
    getStatus(){
        if(this.outcome){
            return this.getSuccess();
        }else{
            return this.getFailure();
        }
    }
}

module.exports = {action}