const db = require('../db')
const { Exercises, Users } = require('../Models')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

const users = [
    {
        name: `John Brooks`,
        username: `quark934`,
        password: `password`,
        pref_exercises: [``]
    }
]

const exercises = [

    {
        image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/09/bench-press.gif?resize=600%2C600&ssl=1',
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/11/Bench-press-muscles-worked.jpg?resize=768%2C768&ssl=1`,
        name: 'Bench Press',
        instructions: [
            '1. Lie on the bench, pull your shoulder blades together and down, and slightly arch your back.', 
            `2. Grip the bar slightly wider than shoulder-width apart.`, 
            `3. Inhale, hold your breath, and unrack the bar.`, 
            `4. Lower the bar with control, until it touches your chest somewhere close to your sternum.`, 
            `5. Push the bar up to the starting position while exhaling.`, 
            `6. Take another breath while in the top position, and repeat for reps.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Chest',
        primary_muscle_id: 'Chest',
        secondary_muscle_id: `Triceps`
    },
    {
        image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/cable-chest-press.gif?resize=600%2C600&ssl=1',
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-cable-chest-press.png?resize=768%2C768&ssl=1`,
        name: 'Cable Chest Press',
        instructions: [
            '1. Fasten a pair of handles in the top position of a cable cross. Grip the handles, step forward, and lean slightly forward.', 
            '2. Push the handles forward until they meet in front of your body.', 
            '3. With control, let the handles go back to the starting position.'
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Chest',
        primary_muscle_id: 'Chest',
        secondary_muscle_id: `Front Deltoid`
    },
    {
        image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Chest-Fly.gif?resize=600%2C600&ssl=1',
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-dumbbell-chest-flyes.png?resize=768%2C768&ssl=1`,
        name: 'Dumbbell Chest Fly',
        instructions: [
            '1. Lie on a bench, and lift a pair of dumbbells up to the starting position.', 
            '2. With almost completely straight arms, lower the dumbbells out to your sides.', 
            `3. When you’ve lowered the dumbbells as deep as possible, reverse the motion and return the dumbbells to the starting position.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Chest',
        primary_muscle_id: 'Chest',
        secondary_muscle_id: `Front Deltoid`
    },
    {
        image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Push-up.gif?resize=600%2C600&ssl=1',
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-push-ups.jpg?resize=768%2C768&ssl=1`,
        name: 'Push-Up',
        instructions: [
            '1. Assume the starting position, with hands slightly wider than shoulder-width apart.', 
            '2. Try to form a straight line from head to feet, and brace your abdomen slightly.', 
            '3. Lower yourself as deep as you can, while inhaling.', 
            `4. Reverse the motion when you’ve touched the floor, and push yourself up to straight arms again while exhaling.`
        ],
        reps: '1-3 sets of 10-20 reps',
        equipment: false,
        muscle_category: 'Chest',
        primary_muscle_id: 'Chest',
        secondary_muscle_id: `Triceps`
    },
    {
        image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Chest-Press.gif?resize=600%2C600&ssl=1',
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-dumbbell-chest-press.png?resize=768%2C769&ssl=1`,
        name: 'Dumbbell Chest Press',
        instructions: [
            '1. Lie on a bench, and lift a pair of dumbbells up to the starting position.', 
            '2. Press the dumbbells up to straight arms, while exhaling.', 
            '3. Inhale at the top, or while lowering the dumbbells with control back to your shoulders.'
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Chest',
        primary_muscle_id: 'Chest',
        secondary_muscle_id: `Triceps`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Dumbbell-shoulder-press.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-trained-by-dumbbell-shoulder-press-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Dumbbell Shoulder Press`,
        instructions: [
            `1. Grab a pair of dumbbells, and lift them up to the starting position at your shoulders.`,
            `2. Inhale and lightly brace your core.`,
            `3. Press the dumbbells up to straight arms, while exhaling.`,
            `4. Inhale at the top, or while lowering the dumbbells with control back to your shoulders.`
        ],
        reps: `1-3 sets of 6-12 reps`,
        equipment: true,
        muscle_category: 'Shoulders',
        primary_muscle_id: `Front Deltoid`,
        secondary_muscle_id: `Triceps`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Seated-barbell-overhead-press.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Muscles-worked-by-seated-barbell-overhead-press.jpg?resize=768%2C768&ssl=1`,
        name: `Seated Barbell Overhead Press`,
        instructions: [
            `1. Sit down on a bench with a raised backrest. The bench should be placed close to a rack, where a barbell rests at about shoulder height.`,
            `2. Grip the bar with an overhand grip.`,
            `3. Inhale, lightly brace your core, and unrack the bar. Lean back on the backrest.`,
            `4. Press the bar up to straight arms, while exhaling.`, 
            `5. Inhale at the top, or while lowering the bar with control back to your shoulders.`
        ],
        reps: `1-3 sets of 6-12 reps`,
        equipment: true,
        muscle_category: 'Shoulders',
        primary_muscle_id: `Front Deltoid`,
        secondary_muscle_id: `Triceps`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/01/Dumbbell-Rear-Delt-Row.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/01/Muscles-worked-in-rear-delt-row.jpg?resize=768%2C768&ssl=1`,
        name: `Dumbbell Rear Delt Row`,
        instructions: [
            `1. Lean forward with a dumbbell in each hand.`,
            `2. Inhale and make a wide rowing motion, where you let your upper arms go out towards the sides.`,
            `3. With control, lower the dumbbells back to the starting position.`
        ],
        reps: `1-3 sets of 6-12 reps`,
        equipment: true,
        muscle_category: 'Shoulders',
        primary_muscle_id: `Rear Deltoid`,
        secondary_muscle_id: `Rotator Cuff`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/cable-lateral-raise.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-cable-lateral-raise.png?resize=768%2C768&ssl=1`,
        name: `Cable Lateral Raise`,
        instructions: [
            `1. Grip a handle connected to the lower position on a cable pulley. Stand close to the pulley, with the arm holding the handle facing away from the machine.`,
            `2. With control, lift the handle outwards to your sides, until your upper arm is horizontal.`,
            `3. Lower the handle with control.`
        ],
        reps: `1-3 sets of 6-12 reps`,
        equipment: true,
        muscle_category: 'Shoulders',
        primary_muscle_id: `Lateral Deltoid`,
        secondary_muscle_id: `Front Deltoid`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Barbell-Front-Raise.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-barbell-front-raise.png?resize=768%2C768&ssl=1`,
        name: `Barbell Front Raise`,
        instructions: [
            `1. Hold a barbell in straight arms, in front of your body.`,
            `2. With control, lift the barbell forward with straight arms, until the bar is at shoulder height.`,
            `3. Reverse the movement and lower the bar with control.`
        ],
        reps: `1-3 sets of 6-12 reps`,
        equipment: true,
        muscle_category: 'Shoulders',
        primary_muscle_id: `Front Deltoid`,
        secondary_muscle_id: `Lateral Deltoid`
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Hantelcurl.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Dumbbell Curl`,
        instructions: [
            `1. Hold a pair of dumbbells in an underhand (supinated) grip, arms hanging by your sides.`,
            `2. Lift the dumbbells with control, by flexing your elbows.`,
            `3. Don’t let your upper arms travel back during the curl. Keep them at your sides or move them slightly forward.`,
            `4. Reverse the movement and lower the dumbbells back to the starting position.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Biceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Hammer-curl.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Hammer Curl`,
        instructions: [
            `1. Hold a pair of dumbbells in a neutral grip (palms facing each other), arms hanging by your sides.`,
            `2. Lift the dumbbells with control by flexing your elbows.`,
            `3. Don’t let your upper arms travel back during the curl. Keep them at your sides, or move them slightly forward.`,
            `4. Reverse the movement and lower the dumbbells back to the starting position.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Biceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/04/preacher-curl-barbell.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Barbell Preacher Curl`,
        instructions: [
            `1. Grab a barbell and sit down at a preacher curl bench, resting your upper arms against the pad.`,
            `2. Lower the barbell as far as you can, with control.`,
            `3. Reverse the motion and return to the starting position.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Biceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/09/spider-curl-does-whatever-a-spider-curl-does-2.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Spider Curl`,
        instructions: [
            `1. Lie down on your chest and stomach on a 45-degree bench, holding a pair of dumbbells in an underhand (supinated) grip.`,
            `2. With your upper arms vertical, lift the dumbbells with control, by flexing your elbows.`,
            `3. Don’t let your upper arms travel back or forwards during the curl. Keep the movement to your forearms only.`,
            `4. Don’t let your upper arms travel back or forwards during the curl. Keep the movement to your forearms only.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Biceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Concentration-curl.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Concentration curl`,
        instructions: [
            `1. Sit on a bench with a dumbbell in hand. Lean your elbow onto the inside of your leg.`,
            `2. Lift the dumbbell with control by flexing your elbow.`,
            `3. Reverse the movement and lower the dumbbell back to the starting position.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Biceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/12/C7251A7B-7A1B-47AE-A88C-7054692BCEF0.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/11/Muscles-worked-in-bench-dips.jpg?resize=768%2C768&ssl=1`,
        name: `Bench Dip`,
        instructions: [
            `1. Turn your back towards a sturdy training bench, and put your hands on the pad about shoulder-width apart. Extend your legs in front of you.`,
            `2. Lower yourself with control for as far as comfortable by bending your arms.`,
            `3. Reverse the motion and return to the starting position.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Triceps`,
        secondary_muscle_id: `Chest`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/09/close-grip-push-up.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/09/Muscles-worked-in-close-grip-push-up-exercise-1024x1024-1.jpg?resize=768%2C768&ssl=1`,
        name: `Close-Grip Push Up`,
        instructions: [
            `1. Assume the starting position, with hands shoulder-width apart.`,
            `2. Try to form a straight line from head to feet and brace your abdomen slightly.`,
            `3. Lower yourself as deep as you can, while inhaling.`,
            `4. Reverse the motion when you’ve touched the floor and push yourself up to straight arms again while exhaling.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: false,
        muscle_category: 'Arms',
        primary_muscle_id: `Triceps`,
        secondary_muscle_id: `Chest`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Barbell-Lying-Tricep-Extension.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/muscles-worked-barbell-lying-tricep-extension-2.png?resize=768%2C768&ssl=1`,
        name: `Barbell Lying Triceps Extension`,
        instructions: [
            `1. Lie down on a bench with your head close to the edge. Hold a barbell with a shoulder-wide grip, and lift it up to straight arms over yourself.`,
            `2. Lower the barbell down behind your head. Try to keep the same distance between your elbows throughout the movement.`,
            `3. Reverse the motion and extend your arms again.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Triceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/03/Lying-Dumbbell-Triceps-Extension-1.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2022/09/Muscles-worked-by-lying-triceps-extension-1024x1024-2.png?resize=768%2C768&ssl=1`,
        name: `Dumbbell Lying Triceps Extension`,
        instructions: [
            `1. Lie down on a bench which your head close to the edge. Hold a pair of dumbbells with your arms pointing straight up.`,
            `2. Lower the dumbbell down behind your head. Try to keep the same distance between your elbows throughout the movement.`,
            `3. Reverse the motion and extend your arms again.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Triceps`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/triceps-pushdown-with-rope.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-triceps-pushdown.png?resize=768%2C768&ssl=1`,
        name: `Tricep Pushdown With Rope`,
        instructions: [
            `1. Fasten a rope handle in the upper position of a cable pulley. Grip the rope with an overhand grip, and take one step back from the pulley.`,
            `2. Pull the rope down until your upper arms are perpendicular to the floor. This is the starting position.`,
            `3. Push the rope down until your arms are fully extended.`,
            `4. With control, let the rope up again.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Arms',
        primary_muscle_id: `Triceps`,
        secondary_muscle_id: `Front Deltoid`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/leg-press.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-leg-press.png?resize=768%2C768&ssl=1`,
        name: `Leg Press`,
        instructions: [
            `1. Adjust the machine so that you only need to extend your legs slightly to be able to release the weights. Adjust the safety pins so that they catch the weight if you are unable to lift it.`,
            `2. Place your feet on the platform, about shoulder-width apart.`,
            `3. Inhale and lower the weight by bending your legs.`,
            `4. Lower the weight as deep as possible without rounding your back and while keeping your glutes on the seat.`,
            `5. Press the weight back up again as you exhale.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Legs',
        primary_muscle_id: `Quads`,
        secondary_muscle_id: `Hamstrings`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/11/squat.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/05/Squat-muscles-worked.png?resize=768%2C768&ssl=1`,
        name: `Squat`,
        instructions: [
            `1. Place the bar on your upper back. Inhale and brace your core slightly, and unrack the bar.`,
            `2. Take two steps back, and adjust your foot position.`,
            `3. Squat as deep as possible with good technique.`,
            `4. With control, stop and reverse the movement, extending your hips and legs again.`,
            `5. Exhale on the way up or exchange air in the top position.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Legs',
        primary_muscle_id: `Quads`,
        secondary_muscle_id: `Lower Back`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Lunge.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-dumbbell-lunge.png?resize=768%2C768&ssl=1`,
        name: `Dumbbell Lunge`,
        instructions: [
            `1. Hold a dumbbell in each hand and stand with your feet about shoulder width apart.`,
            `2. Take a big step forward and sink as deep as possible in a lunge position, without hitting the knee of the back leg in the floor.`,
            `3. Return to the starting position by pushing yourself back with the front leg.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Legs',
        primary_muscle_id: `Quads`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Heel-raise.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Muscles-worked-by-heel-raise.jpg?resize=768%2C768&ssl=1`,
        name: `Heel Raise`,
        instructions: [
            `1. Stand on a solid surface, or an elevation for increased range of motion. Hold on to something for balance.`,
            `2. Raise your heels by using your calves.`,
            `3. Lower yourself with control, and repeat for reps.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: false,
        muscle_category: 'Legs',
        primary_muscle_id: `Calves`,
        secondary_muscle_id: `None`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/leg-curl-lying.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-lying-leg-curl.png?resize=768%2C768&ssl=1`,
        name: `Lying Leg Curl`,
        instructions: [
            `1. Adjust the machine so that you are correctly positioned. Your knees should be in line with the machine’s joint.`,
            `2. Lift the weight by bending your knees as far as possible.`,
            `3. Slowly lower the weight again.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Legs',
        primary_muscle_id: `Hamstrings`,
        secondary_muscle_id: `None`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Row.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/03/muscles-worked-dumbbell-row-2.png?resize=768%2C768&ssl=1`,
        name: `Dumbbell Row`,
        instructions: [
            `1. Start by placing a dumbbell on the floor beside a bench or chair. Stand facing the bench or chair and place your left hand and left knee on top of it.`,
            `2. Keep your back flat and parallel to the ground, with a slight bend in the standing leg. Grip the dumbbell with your right hand.`,
            `3. Inhale and pull the dumbbell by driving the elbow toward the ceiling.`,
            `4. With control, lower the dumbbell back to the starting position while exhaling.`,
            `5. Complete desired reps on one side, then switch to the opposite arm and leg.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Back',
        primary_muscle_id: `Lats`,
        secondary_muscle_id: `Biceps`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/lat-pulldown-with-pronated-grip.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-Lat-Pulldown-With-Supinated-Grip.png?resize=768%2C768&ssl=1`,
        name: `Lat Pulldown`,
        instructions: [
            `1. Begin by adjusting the thigh pad to fit snugly against your thighs to prevent your body from lifting off the seat.`,
            `2. Grasp the bar with an overhand (pronated) grip, with your hands slightly wider than shoulder-width apart.`,
            `3. Sit with your thighs under the thigh pad, keep your chest up, and look at the bar.`,
            `4. Pull the bar down towards your chest, leading with your elbows. Pull until the bar is below your chin or touches your upper chest.`,
            `5. Squeeze your shoulder blades together at the bottom of the movement.`,
            `6. Exhale and slowly release the bar back up to the starting position.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Back',
        primary_muscle_id: `Lats`,
        secondary_muscle_id: `Biceps`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Shrug.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-dumbbell-shrug.png?resize=768%2C768&ssl=1`,
        name: `Dumbbell Shrug`,
        instructions: [
            `1. Hold a pair of dumbbells at your sides.`,
            `2. Lift your shoulders straight up as high as possible.`,
            `3. Lower your shoulders again.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Back',
        primary_muscle_id: `Trapezius`,
        secondary_muscle_id: `Forearm Flexors`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/pull-up.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-pull-ups.png?resize=768%2C768&ssl=1`,
        name: `Pull Up`,
        instructions: [
            `1. Grip the bar with palms facing away from you, slightly wider than shoulder-width.`,
            `2. Keep your chest up, and look up at the bar.`,
            `3. Inhale and pull yourself up until your chin is over the bar or the bar touches your upper chest.`,
            `4. Exhale and lower yourself with control until your arms are fully extended.`
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Back',
        primary_muscle_id: `Lats`,
        secondary_muscle_id: `Biceps`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Deadlift.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/04/Deadlift-muscles-worked.png?resize=768%2C768&ssl=1`,
        name: `Deadlift`,
        instructions: [
            `1. Step up close to the bar so that it is about over the middle of your foot.`,
            `2. Inhale, lean forward, and grip the bar.`,
            `3. Hold your breath, brace your core slightly, and lift the bar.`,
            `4. Pull the bar close to your body, with a straight back, until you are standing straight.`,
            `5. Lower the bar back to the ground with control.`,
        ],
        reps: '1-3 sets of 6-12 reps',
        equipment: true,
        muscle_category: 'Back',
        primary_muscle_id: `Lower Back`,
        secondary_muscle_id: `Quads`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/01/Crunch.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-plank-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Crunch`,
        instructions: [
            `1. Lie on your back, with your hands in front of your chest and your knees bent to about 90 degrees.`,
            `2. Lift your upper body by contracting your abs and bending forward.`,
            `3. Bend as far forward as possible while still keeping your low back in contact with the floor, and then return to the starting position.`,
        ],
        reps: '1-3 sets of 15-30 reps',
        equipment: false,
        muscle_category: 'Abs',
        primary_muscle_id: `Abs`,
        secondary_muscle_id: `Obliques`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/lying-leg-raises.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-plank-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Lying Leg Raise`,
        instructions: [
            `1. Lie down with your back on the floor, and your arms at your sides.`,
            `2. With straight legs, lift your legs until they are pointing straight up.`,
            `3. Lower your legs again, with control.`,
        ],
        reps: '1-3 sets of 15-30 reps',
        equipment: false,
        muscle_category: 'Abs',
        primary_muscle_id: `Abs`,
        secondary_muscle_id: `Obliques`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Oblique-sit-up.gif?resize=600%2C600&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Muscles-worked-by-oblique-sit-up.jpg?resize=768%2C768&ssl=1`,
        name: `Oblique Sit-Up`,
        instructions: [
            `1. Lie on your back, with your hands behind your head, and your legs bent to about 90 degrees. Use a weight or something to stick your feet under, so they don’t lift from the ground.`,
            `2. Lift your upper body diagonally by contracting your obliques and bending forward, until your right elbow touches your left leg, or vice versa.`,
            `3. Return to the starting position.`,
        ],
        reps: '1-3 sets of 15-30 reps',
        equipment: false,
        muscle_category: 'Abs',
        primary_muscle_id: `Obliques`,
        secondary_muscle_id: `Abs`,
    },
    {
        image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/Plank.jpg?resize=768%2C768&ssl=1`,
        muscle_image: `https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-plank-exercise.jpg?resize=768%2C768&ssl=1`,
        name: `Plank`,
        instructions: [
            `1. Stand on your elbows and feet.`,
            `2. Brace your abs and try to form and hold a straight line from your head to feet.`,
        ],
        reps: '1-3 sets of 1-2 minutes',
        equipment: false,
        muscle_category: 'Abs',
        primary_muscle_id: `Abs`,
        secondary_muscle_id: `Obliques`,
    },
]
    
await Users.insertMany(users)
console.log('User created!')
await Exercises.insertMany(exercises)
console.log("Exercises added!")
}

const run = async () => {
await main()
db.close()   
} 

run()