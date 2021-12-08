const input = require("./input.json")

/**
 * class state is the state of our problem
 * It will handle position for our agent, the transition function with validation
 * It will also calculate the rewards of each cell we can go in
 * 
 * - In case the cell we want to transitionate in is invalid (outside the borders / on ice) it will return -1
 */
class state{
    obstacles = [];
    agent = []
    target = []
    border = []

    constructor(input){
        // As we store the actual game in class problem we will define a border variable
        this.border = [input.length, input[0].length]
        for(var i=0; i<input.length; i++){
            for(var j=0; j<input[i].length; j++){
                if(input[i][j] === 1){
                    this.agent = [i,j] // Position of agent
                }
                if(input[i][j] === 2){
                    this.target = [i,j] // Position of taget
                }
                if(input[i][j] === 3){
                    this.obstacles = [i,j] // Obstacle list
                }
            }
        }
        this.calculateRewards()
        console.log(this);
    }

    // Getters
    get agent(){ return this.agent; }
    get target(){ return this.target; }
    get obstacles(){ return this.obstacles; }
    get border(){ return this.border; }

    // Setters
    set target(x){ this.target=x; }
    set obstacles(x){ this.obstacles=x; }
    set border(x){ this.border.push(x); }

    // The only setter we will need
    set agent(x){ // Setter must have exactly one formal parameter.
        var i = x[0]
        var j = x[1]
        if(this.checkAgentPos(i,j)){
            this.agent = [i,j]
            // TODO
            // Construct an object containing the history states of the problem
            return 0;
        } else {
            console.error(`Invalid state [${i},${j}] provided`)
            return -1;
        }
    }

    //TODO
    // Create a method that will be able to reset the state to a previous one

    /**
     * Checks a transition
     * @param {integer} i coord x
     * @param {integer} j coord y
     * @returns {boolean} If the transition to be made is valid or not
     */
    checkAgentPos(i,j){
        // If state is not outside borders & the cell does not have ice on it
        if(i < 0 || j<0 || i>=this.border[0] || j>=this.border[1] || this.obstacles.filter((k)=> k[0] == i && k[1] == j).length > 0){
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Calculates rewards for each cell
     *  In this instance we are working with losses instead of gain but its essentially the same
     */
    calculateRewards(){
        // TODO
        // Make the reward calculation (distance) be based on where the agent is
        // For now this calculates distance for the initial state of the problem
        this.rewards = []
        // calculate distance from point x to target point
        for(var i=0; i<this.border[0]; i++){
            this.rewards[i] = []
            for(var j=0; j<this.border[1]; j++){
                this.rewards[i][j] = Math.sqrt((i-this.target[0])*(i-this.target[0]) + (j-this.target[1])*(j-this.target[1]))
            }
        }
    }
}

class problem{
    constructor(input){
        this.table = input;
        this.state = new state(input)
    }

    //TODO
    // print function

    //TODO
    // solve function

    //TODO
    //Q-learning
}

function start(){
    var p = new problem(input);
}

start()