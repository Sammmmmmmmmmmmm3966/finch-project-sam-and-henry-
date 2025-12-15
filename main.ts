finch.startFinch()
class SamHenryFinchCode {
    xValues: number[]
    moveNumber: number[]
    yValues: number[]
    count: number
    // The idea is we have a class for the code that way we can make decions about exploration and clearly defined movement methods
    constructor() {
        this.xValues = [0]
        this.moveNumber = [0]
        // Each run stores its movement data here so it can be acsesed across every method
        this.yValues = [0]
        this.count = 0
    }
    
    public selectMode() {
        // This is where the user can select what they want their finch to do
        finch.setBeak(50, 100, 50)
        input.onButtonPressed(Button.A, function on_button_pressed_a() {
            this.driveSquare()
        })
        input.onButtonPressed(Button.B, function on_button_pressed_b() {
            this.explore()
        })
        input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
            this.dance()
        })
    }
    
    public driveSquare() {
        // the driveSquare method alows our finch to drive in a set path
        let x = true
        this.count = 0
        while (x) {
            while (finch.getDistance() >= 30) {
                // this is how we deterine if we need to do obstacle avodiance
                for (let i = 0; i < 4; i++) {
                    finch.setMove(MoveDir.Forward, 10, 50)
                    finch.setTurn(RLDir.Right, 90, 50)
                    this.checkDistance()
                }
                this.count += 1
                if (this.count == 20) {
                    x = false
                    this.dance()
                }
                
            }
            finch.stopMotors()
            this.checkDistance()
        }
    }
    
    public checkDistance() {
        // We check the distance so that way we can stay away from anything that may get in our way
        while (finch.getDistance() < 30) {
            this.lightSelection()
            finch.setTurn(RLDir.Left, 180, 50)
            this.xValues.insertAt(0, 7)
            this.yValues.insertAt(0, 180)
            finch.setMove(MoveDir.Forward, 35, 50)
            this.xValues.insertAt(0, 8)
            this.yValues.insertAt(0, 35)
            if (finch.getDistance() >= 30) {
                break
            }
            
        }
    }
    
    public explore() {
        let y: number;
        // the explore method is what we are going to use to have the robot roam around the room
        let x = 0
        let o = true
        this.count = 0
        finch.setBeak(0, 0, 100)
        while (o == true) {
            while (finch.getDistance() >= 30) {
                finch.setBeak(0, 0, 100)
                x = randint(1, 5)
                this.checkDistance()
                if (x == 1 || x == 5) {
                    y = finch.getDistance()
                    finch.setMove(MoveDir.Forward, y - 20, 50)
                    this.yValues.insertAt(0, y - 20)
                    this.xValues.insertAt(0, x)
                    this.moveNumber.insertAt(0, this.count)
                    this.checkDistance()
                } else if (x == 2) {
                    y = randint(10, 90)
                    finch.setTurn(RLDir.Right, y, 50)
                    this.checkDistance()
                    this.yValues.insertAt(0, y)
                    this.xValues.insertAt(0, x)
                    this.moveNumber.insertAt(0, this.count)
                } else if (x == 3) {
                    y = randint(10, 90)
                    finch.setTurn(RLDir.Left, y, 50)
                    this.yValues.insertAt(0, y)
                    this.xValues.insertAt(0, x)
                    this.moveNumber.insertAt(0, this.count)
                    this.checkDistance()
                } else if (x == 4) {
                    finch.setTurn(RLDir.Right, 180, 50)
                    this.yValues.insertAt(0, 180)
                    this.xValues.insertAt(0, x)
                    this.moveNumber.insertAt(0, this.count)
                    this.checkDistance()
                }
                
                this.checkDistance()
                console.log(this.xValues)
                console.log(this.yValues)
                this.count += 1
                if (this.count == 20) {
                    o = false
                    finch.stopMotors()
                    //  basic.show_string("Done Exploring,Headed to Start")
                    this.returnHomeTWO()
                    break
                }
                
            }
            this.checkDistance()
        }
    }
    
    public resultsExplore() {
        // Gives the option for the user to print the logs of what movement the finch made on whichever turn
        for (let item of this.xValues) {
            // It would be cool to have it where the user could choose which turn they want or to see which movement was most common
            if (item == 1 || item == 5) {
                console.log("The robot moved foward")
            }
            
            if (item == 2) {
                console.log("The robot turned to the right")
            }
            
            if (item == 3) {
                console.log("The robot turned to the left")
            }
            
            if (item == 4) {
                console.log("The robot turned around")
            }
            
        }
        this.returnHomeTWO()
    }
    
    public dance() {
        let v: number;
        let z: number;
        let y: number;
        let r: number;
        // Makes the robot dance by going back and forth at random angles
        this.count = 0
        let x = true
        while (x) {
            v = randint(0, 100)
            z = randint(0, 100)
            y = randint(0, 100)
            r = randint(45, 125)
            finch.setBeak(v, y, z)
            finch.setTail(TailPort.One, y, z, v)
            finch.setTail(TailPort.Two, z, y, v)
            finch.setTail(TailPort.Three, z, y, v)
            finch.setTail(TailPort.Four, y, z, v)
            finch.setTurn(RLDir.Right, 720, 80)
            finch.setTurn(RLDir.Right, r, 75)
            finch.setTurn(RLDir.Left, r, 75)
            this.count += 1
            if (this.count == 10) {
                x = false
                this.selectMode()
            }
            
        }
    }
    
    public lightSelection() {
        // how we determine what light colours to use for the robot
        if (finch.getDistance() < 30) {
            finch.setBeak(100, 0, 0)
        } else if (finch.getDistance() > 30) {
            finch.setBeak(0, 100, 0)
        }
        
    }
    
    public returnHomeTWO() {
        let item: number;
        let magnitude: number;
        finch.setBeak(100, 0, 100)
        while (this.xValues) {
            item = this.xValues.get(0)
            magnitude = this.yValues.get(0)
            if (item == 1 || item == 5 || item == 8) {
                finch.setMove(MoveDir.Backward, magnitude, 50)
            } else if (item == 2) {
                finch.setTurn(RLDir.Left, magnitude, 50)
            } else if (item == 3) {
                finch.setTurn(RLDir.Right, magnitude, 50)
            } else if (item == 4) {
                finch.setTurn(RLDir.Right, magnitude, 50)
            } else if (item == 7) {
                finch.setTurn(RLDir.Right, magnitude, 50)
            } else {
                basic.showString("Done")
                break
            }
            
            _py.py_array_pop(this.xValues, 0)
            _py.py_array_pop(this.yValues, 0)
            console.log(this.xValues[0])
            console.log(this.yValues[0])
        }
        finch.stopMotors()
        this.dance()
    }
    
}

let robot = new SamHenryFinchCode()
robot.selectMode()
