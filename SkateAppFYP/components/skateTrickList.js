import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from '../Icon/Icon';

const Tricks = [
    {
        name: "Ollie",
        description: [
            {
                stepTitle: "Foot Position",
                stepDescription: "Put your feet in this position with your front foot straight on the board just down from those front bolts on the skateboard.  Your back foot is on the tail with the ball of your foot on the center edge of the tail.  While you’re on the board, your shoulders should be square with the board and not turned and your head looking straight forward.  Your legs generally follow your upper body so being aware of what your upper body is doing can help a lot in learning the proper techniques."
            },
            {
                stepTitle: "Popping the tail",
                stepDescription: "Bend your front knee and push down on your back leg. Your back ankle bends and the ball of your foot pushes the tail of your board to the ground. You have the most speed and power in the motion of your ankle so repeating this motion with your ankle rather then your whole leg is important to learn well here. Push your tail down repeatedly until you feel very comfortable with this step. If you don’t get this step down well, like all the steps in this tutorial, you won’t be able to move on and actually learn the trick."
            },
            {
                stepTitle: "Sliding the front foot",
                stepDescription: "Now with your tail to the ground and all of your weight on your back foot we are going to work on the motion of your front foot.  This is the hardest and most uncomfortable step for a new skater.  This practice step right here is the make break of your Ollie.  It’s an unnatural movement for your ankle which is why I think it’s the hardest for new skaters to learn. Your front ankle rolls forward putting the sole of your foot vertical on the board.  The front top of your foot will be in contact with the grip tape and that part of your foot is going to then drag up the grip tape. It’s important to understand which part of your foot slides on the grip tape and how to quickly move your foot to get it into this position.It’s a fast roll of the ankle on the board dragging it up the grip tape. This step is where the magic of the Ollie comes in. Your front foot drags up the board pulling your board into the air. Repeat this practice step many, many times. If you ever have trouble on later steps always come back to this step and practice the movement of your leg and foot.  By doing this, you are building the muscle memory necessary to putting all these steps together."

            },
            {
                stepTitle: "Kicking the front foot",
                stepDescription: "There is one key step after dragging your foot up the board to create the lift and that is to push your front foot forward.  You can do this step standing still just to get the motion down but as this is a coordinated piece between your front and back legs you cannot truly learn it until you are popping your board in the air. So drag your front foot up and push it forward over the nose.  Now let’s get to the coordination of putting this masterpiece together."
            },
            {
                stepTitle: "Putting it all together",
                stepDescription: "After those first 2 steps are mastered, you essentially are putting those steps together. This is all about timing and coordination. Drop your back leg and ankle, popping your tail on the ground with the ball of your back foot while you simultaneously bend your front knee, lifting your front leg up and rolling your front ankle so the front part of your foot can grab that grip tape and pull the board into the air. Your back foot jumps up off the ground as soon as the board pops and your front foot begins the drag up the grip tape. Once your board has reached the peak of the Ollie, keep your back foot moving up while you push your front foot forward and this will level out your Ollie in the air.  Getting that step down well will greatly increase the height of your Ollie."
            },
            {
                stepTitle: "Land!",
                stepDescription: "Now that you are magically floating above the earth ready your landing gear by extending your knees slightly more. You don’t want to land with your knees fully extended or bent but in between. Your feet should be in a relatively similar position to the starting point with the exception of your front foot being possibly closer to the nose at this point. Bring your feet down and let your wheels roll."
            },
        ],
        videoUrl: "_cmXDVZrKZU"
    },
    {
        name: "Frontside 180",
        description: [
            {
                stepTitle: "Foot Position",
                stepDescription: "The foot position for the Frontside 180 is very similar to ollie. Your back foot should be on the tail with the ball of your foot at the very tip of the board. Your front foot should be close to the front bolts of your skateboard. It will be positioned very similar to the ollie. You may feel more comfortable with the foot slightly higher up than your ollie position, or with the toes just slightly hanging off. Play around with the front foot position until you find something comfortable and that works for you."
            },
            {
                stepTitle: "Body Position",
                stepDescription: "This is the most important part of the Frontside 180. Before you even pop this trick, your body should be beginning to turn frontside (towards your heels). As you pop this trick, your body being halfway rotated will force your hips and legs to follow you to complete the 180-degree rotation. It is extremely important to follow through with this motion to ensure you fully rotate and roll away upon landing."
            },
            {
                stepTitle: "Practice Steps",
                stepDescription: "The best way to begin practicing this trick is to first practice your ollie steps. Start with practicing popping your tail down as you would for an ollie. The second step is sliding the front foot up the board. The difference between this Frontside 180 practice step and the ollie practice step is that you’ll be turning your head and shoulders towards your heel side as you slide your foot up the board for the Frontside 180. So pop your tail down, and turn your head and shoulders to the side as you slide your foot. Practice this motion until it feels natural. At first sight, it looks like all you’re doing is moving your feet. In reality, this doesn’t work out that well as you saw in the video above. The secret to this trick is pivoting your upper body right before you pop. This will help ensure your feet follow and pivot underneath you."
            },
            {
                stepTitle: "Popping and Turning",
                stepDescription: "This part of the trick often works itself out if you’ve paid attention to the practice steps and have your ollies down. Simply pop your ollie, slightly turned already as you pop. As your front foot slides up the board and your head and shoulders turn towards your heels, your hips will follow through with this motion and bring your legs around 180-degrees with the board. Sometimes if you aren’t able to complete the full rotation, you will be able to land the trick more on the nose end of your board and pivot the final few degrees of the rotation. Eventually, though, you’ll be able to pop with enough height to fully rotate and land switch without any pivots or tic-tacs."
            },
            {
                stepTitle: "Landing",
                stepDescription: "Almost there! The final part of this trick, and perhaps the most awkward aspect is landing. Upon landing, you’ll be rolling away switch, so it’s important that you are somewhat comfortable riding switch. Remember to have your knees bent for landing and to compress any impact you may feel. Often times this trick will be landed with the front trucks touching down first, as you pivot the rest of the rotation before your back trucks touch down. You may find yourself landing this way more often than not when you are first beginning to learn FS 180s. However, over time or with enough pop, you will be able to fully rotate in the air, and landing will be as simple as bending your knees, bracing for the impact, and rolling away switch. To have that smooth rollaway it’s important to FULLY COMMIT TO TURNING YOUR SHOULDERS. If you are having trouble with the full commitment, try this trick while riding fakie. Use the exact same principles you would with a regular FS 180, only this time you’ll be landing and riding away in your regular foot position, instead of switch. This may help give you the confidence to fully commit to a regular Frontside 180 where you will land switch."
            },           
        ],
        videoUrl: "OqYb98vp0zI"
    },
    {
        name: "Backside 180",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "5RtkYzx3TdE"
    },
    {
        name: "Pop Shove It",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "tyXwyN_t"
    },
    {
        name: "Frontside Pop Shove It",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "rbpllQ2bGAE"
    },
    {
        name: "Heelflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "phsJk5_jHkU"
    },
    {
        name: "Kickflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "YOf0XeI7KzU"
    },
    {
        name: "Varial Kickflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "q0FxPQp2wHk"
    },
    {
        name: "Hardflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "hZlSr6SQvds"
    },
    {
        name: "Varial Heelflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "ter2CbfTe4E"
    },
    {
        name: "Inward Heelflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "0SmsV8Xb7fA"
    },
    {
        name: "Backside 180 Kickflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "T0VUCWLYg9E"
    },
    {
        name: "Frontside 180 kickflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "_YCXMS2_O6w"
    },
    {
        name: "Backside 180 Heelflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "qLX_ekRgfdw"
    },
    {
        name: "Frontside 180 Heelflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "aN0jbylT3IY"
    },
    {
        name: "360 Pop Shove It",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "tapZBLs4xI0"
    },
    {
        name: "Backside Big Spin",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "MsPPeoeukoU"
    },
    {
        name: "Frontside Big Spin",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "pksJFJQnLHA"
    },
    {
        name: "360 Flip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "PnuobIzTPMs"
    },
    {
        name: "Ollie Impossible",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "a_1Hz88lpY8"
    },
    {
        name: "Laser Flip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "B991k5v-cvE"
    },
    {
        name: "Casper Flip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "x4O6bDFlKHw"
    },
    {
        name: "Backside Big Spin Kickflip",
        description: [
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
            {
                stepTitle: "",
                stepDescription: ""
            },
        ],
        videoUrl: "TuzfkgxbOeQ"
    }
]

export default class SkateTrickList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navTo(route, params) {
        if (this.props.passNav) {
            this.props.passNav.navigation.navigate(route, params)
        }
    }

    render() {
        return (
            <ScrollView nestedScrollEnabled={true} >
                {this.props.trickBook ?
                    Tricks.map((trick, i) => {
                        return (
                            <TouchableOpacity key={i} style={styles.trickContainer} onPress={() => this.navTo("SingleTrick", trick)}>
                                <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.skateText}>{trick.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                    :
                    [
                        (this.props.usersAchievedtricks.length == 0 ?
                            <Text key="head over" style={{ fontSize: 22, textAlign: 'center' }}>Head over to the trick book to learn some new tricks.</Text>
                            :
                            this.props.usersAchievedtricks.map((trick, i) => {
                                return (
                                    <TouchableOpacity key={i} style={styles.trickContainer} onPress={() => this.navTo("SingleTrick", trick)}>
                                        <Text style={styles.skateText}>{trick}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        )
                    ]
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    skateText: {
        paddingHorizontal: 10,
        fontSize: 28
    },
    trickContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 2,
        margin: 5,
        borderColor: 'rgba(0,0,255,0.9)',
        maxHeight: 100,
        minHeight: 100,
        minWidth: '80%'
    }
});