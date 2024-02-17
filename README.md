# React Ropes

A tool do display image as dynamicaly animated object on a line or rope
<br />
<a href='https://www.genomica.pl/program'>Example on Genomica website</a>
<img src='https://github.com/tzmcion/ReactRopes/assets/64361206/fc9126ff-94d3-41cc-9423-f50899403eed' alt='demo gif' width='250' />
## Usage

Download the package:
```node
npm install react-image-rope
```

Import rope-image from the package and image which you want to render
  

```js
import {RopeImage} from 'react-image-rope';
import my_image from './my_image.png'  //.gif is not supported
```

Than use in the component:

```jsx
<RopeImage className='LoveU' width={250} height={250} src={my_image}/>
```

## Options

### Package provides options to edit the behaviour of the component
To use them we need to import additional object from package
```js
import {RopeImage,RopeOptions} from 'react-image-rope'
import my_image from './my_image.png'  //.gif is not supported
```

Then we need to create object based on those options <br />
We can change the imported object without creating the new one, but then the same changes will be implemented to every object in the app

```jsx
export default function MyComponent(){
  const options = {...RopeOptions}; //if we want to change options only for this component

  options.gravity = 0.2; // changing force of the gravity
  options.radial_blocks = true; //changing if the rope is build out of wheels or rectangles

  return(
          //adding options prop to the RopeImage component
          <RopeImage className='LoveU' width={250} height={250} options={options} src={my_image}/>
)}
```

### Advanced Options:

Here is a description of more advanced options:

* <b>img_rotate_target_index</b><br />
    This option sets the reference point for rotation of the image. By default it is set to the anchor point of the rope, therefore index 0.
*  <b>bounce_type</b><br />
    This options can be set either to -1,-2,-3 or 0
    -1 allows only bounces off the floor
    -2 allows bounces off the floor and walls
    -3 allows bounces from every wall of rectangle
    0 is no bounces at all

*  <b>verlet_calculation_per_frame</b><br />
    Sets how much the correction of the objects is calculated per one frame
    Package callculates the disproportion between real distance and target distance betwen blocks, and tries to correct it. The more time it does it per frame, the real distance lim->target distance, but it will never reach it exactly. In other words, the more calculations, the more realistic the integration looks, but it costs with the speed, and to much calculations looks very artificial

*  <b>verlet_extend_length</b><br />
    Extends the lenght of the object to always cover the holes between objects building the line. Can look very blank/flat when used

To see all the options open the package file called Options.ts <br />
react-rope-image/src/Options.ts <br />
All are described with comments

## User Integration

### Package provides a way to user integration:
Function which is a handler whenever mouse is over the element of the rope can be defined <br />
Let's create an example function:

```js
  const onPointHover = (point) =>{
    point.set_speed(5,5);  //set's 5 x speed and 5 y speed for the point on which mouse is hovering
  }
```

using typescript, we need to import Point from package:

```ts
import {RopeImage,RopeOptions,Point} from 'react-image-rope'
[...]
  const onPointHover = (point:Point):void =>{
    point.set_speed(5,5);  //set's 5 x speed and 5 y speed for the point on which mouse is hovering
  }
```

Then we can just add the handler to the RopeImage

```js
<RopeImage className='LoveU' width={250} height={250} onHover={onPointHover}/>
```

Currently package provides only 2 function to manipulate point on hover: <br />
```ts
Point::set_speed(velocity_x:number,velocity_y:number)  //  //adding velocity to the point
Point::set_position(x:number,y:number)  //Teleporting to the point
```

And that's all <br />
package is still growing 😊 <br />
Have fun with it!! <br />

## Author:
Package created by tzmcion -- Tymoteusz Apriasz <br />
https://www.linkedin.com/in/tymoteusz-apriasz-2ba8501a6/

Want to contribute?
Open a push request any time you're ready!

Check out my other projects!

### Ciao!
