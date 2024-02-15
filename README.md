# React Ropes

React library to implement behavior like rope-hanging objects
<br />
<img src='https://github.com/tzmcion/ReactRopes/assets/64361206/fc9126ff-94d3-41cc-9423-f50899403eed' alt='demo gif' width='250' />
## Usage

Download the package:
```node
npm install package-not-yet-published-so-there-is-no-name
```

Import rope-image from the package and image which you want to render
  

```js
import {RopeImage} from 'react-image-rope';
import my_image from './my_image.png'  //.gif is not supported
```
Currently the package is not supporting adding class or id to id (sorry...) <br />
Therefore it needs to be wrapped inside div or any other container to freely move around <br />
Consequently, to have a class name, we need to setup component in a div <br />

```jsx
    <div className="Your-class">
        <RopeImage className='dada' width={250} height={250} src={my_image}/>
    </div>
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
    <div className="Your-class">
          //adding options prop to the RopeImage component
          <RopeImage className='dada' width={250} height={250} options={options} src={my_image}/>
    </div>
)}
```
To see all the options open the package file, in the package called Options.ts <br />
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
<RopeImage className='dada' width={250} height={250} onHover={onPointHover}/>
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

Check out my other projects!

This is <b>NOT</b> on MIT license!!! <br />
Don't copy the code and publish it as yours, <br />
but you are free to use it freely and edit it <br />

### Ciao!
