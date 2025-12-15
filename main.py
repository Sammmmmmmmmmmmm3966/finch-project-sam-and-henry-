finch.start_finch()
class SamHenryFinchCode: #The idea is we have a class for the code that way we can make decions about exploration and clearly defined movement methods
    def __init__(self):
        self.xValues = [0] 
        self.moveNumber = [0] #Each run stores its movement data here so it can be acsesed across every method
        self.yValues = [0]
        self.count = 0
    def selectMode(self):#This is where the user can select what they want their finch to do
            finch.set_beak(50, 100, 50)
            def on_button_pressed_a():
                self.driveSquare()
            input.on_button_pressed(Button.A, on_button_pressed_a)
            def on_button_pressed_b():
                self.explore()
            input.on_button_pressed(Button.B, on_button_pressed_b)
            def on_button_pressed_ab():
                self.dance()
            input.on_button_pressed(Button.AB, on_button_pressed_ab)
    def driveSquare(self):#the driveSquare method alows our finch to drive in a set path
        x = True
        self.count = 0
        while x:
            while finch.get_distance() >= 30: #this is how we deterine if we need to do obstacle avodiance
                for i in range(4):
                    finch.set_move(MoveDir.FORWARD, 10, 50)
                    finch.set_turn(RLDir.RIGHT, 90, 50)
                    self.checkDistance()
                self.count += 1
                if self.count == 20:
                    x = False
                    self.dance()
            finch.stop_motors()
            self.checkDistance()
    def checkDistance(self):#We check the distance so that way we can stay away from anything that may get in our way
        while finch.get_distance() < 30:
            self.lightSelection()
            finch.set_turn(RLDir.LEFT,180,50)
            self.xValues.insert(0,7)
            self.yValues.insert(0,180)
            finch.set_move(MoveDir.FORWARD, 35, 50)
            self.xValues.insert(0,8)
            self.yValues.insert(0,35)
            if finch.get_distance() >= 30:
                break   
    def explore(self):#the explore method is what we are going to use to have the robot roam around the room
        x = 0
        o = True
        self.count = 0
        finch.set_beak(0, 0, 100)
        while o == True:
            while finch.get_distance() >= 30:
                finch.set_beak(0, 0, 100)
                x = randint(1, 5)
                self.checkDistance()
                if x == 1 or x == 5:
                    y = finch.get_distance()
                    finch.set_move(MoveDir.FORWARD,y-20,50)
                    self.yValues.insert(0,y-20)
                    self.xValues.insert(0,x)
                    self.moveNumber.insert(0,self.count)
                    self.checkDistance()
                elif x == 2:
                    y = randint(10,90)
                    finch.set_turn(RLDir.RIGHT, y, 50)
                    self.checkDistance()
                    self.yValues.insert(0,y)
                    self.xValues.insert(0,x)
                    self.moveNumber.insert(0,self.count)
                elif x == 3:
                    y = randint(10,90)
                    finch.set_turn(RLDir.LEFT, y, 50)
                    self.yValues.insert(0,y)
                    self.xValues.insert(0,x)
                    self.moveNumber.insert(0,self.count)
                    self.checkDistance()
                elif x == 4:
                    finch.set_turn(RLDir.RIGHT, 180, 50)
                    self.yValues.insert(0,180)
                    self.xValues.insert(0,x)
                    self.moveNumber.insert(0,self.count)
                    self.checkDistance()
                self.checkDistance()
                print(self.xValues)
                print(self.yValues)
                self.count += 1
                if self.count == 20:
                    o = False
                    finch.stop_motors()
                    # basic.show_string("Done Exploring,Headed to Start")
                    self.returnHomeTWO()
                    break
            self.checkDistance()
    def resultsExplore(self):#Gives the option for the user to print the logs of what movement the finch made on whichever turn
        for item in self.xValues:#It would be cool to have it where the user could choose which turn they want or to see which movement was most common
            if item == 1 or item == 5:
                print(f"The robot moved foward")
            if item == 2:
                print("The robot turned to the right")
            if item == 3:
                print("The robot turned to the left")
            if item == 4:
                print("The robot turned around")
        self.returnHomeTWO()
    def dance(self):#Makes the robot dance by going back and forth at random angles
        self.count = 0
        x = True
        while x:
            v = randint(0,100)
            z = randint(0,100)
            y = randint(0,100)
            r = randint(45, 125)
            finch.set_beak(v, y, z)
            finch.set_tail(TailPort.ONE, y, z, v)
            finch.set_tail(TailPort.TWO, z, y, v)
            finch.set_tail(TailPort.THREE, z, y, v)
            finch.set_tail(TailPort.FOUR, y, z, v)
            finch.set_turn(RLDir.RIGHT, 720, 80)
            finch.set_turn(RLDir.RIGHT, r, 75)
            finch.set_turn(RLDir.LEFT, r, 75)
            self.count += 1
            if self.count == 10:
                x = False
                self.selectMode()
    def lightSelection(self):#how we determine what light colours to use for the robot
        if finch.get_distance() < 30:
            finch.set_beak(100, 0, 0) 
        elif finch.get_distance() > 30:
            finch.set_beak(0, 100, 0)
    def returnHomeTWO(self):
                finch.set_beak(100, 0, 100)
                while self.xValues:
                    item = self.xValues.get(0)
                    magnitude = self.yValues.get(0)
                    if item == 1 or item == 5 or item == 8: 
                        finch.set_move(MoveDir.BACKWARD, magnitude, 50)
                    elif item == 2: 
                        finch.set_turn(RLDir.LEFT, magnitude, 50)
                    elif item == 3:
                        finch.set_turn(RLDir.RIGHT, magnitude, 50)
                    elif item == 4: 
                        finch.set_turn(RLDir.RIGHT, magnitude, 50)
                    elif item == 7: 
                        finch.set_turn(RLDir.RIGHT, magnitude, 50)
                    else:
                        basic.show_string("Done")
                        break
                    self.xValues.pop(0)
                    self.yValues.pop(0)
                    print(self.xValues[0]) 
                    print(self.yValues[0])
                finch.stop_motors()
                self.dance()    
robot = SamHenryFinchCode()
robot.selectMode()