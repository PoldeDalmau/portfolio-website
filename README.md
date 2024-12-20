# Portfolio website

This is the first version of my portfolio website. Here, I showcase some of my experience and projects and try to make it in an interactive way including 3D elements.

For the live website visit the following link:

[https://poldedalmau.github.io/personal-portfolio-website/](https://poldedalmau.github.io/personal-portfolio-website/)

# Guide

This guide assumes that visual studio code is used as the editor, and that [node](https://nodejs.org/en/download/package-manager) and [vite](https://vite.dev/guide/) are already installed.

1. clone the repo and run ```npm install```
2. run ```npx parcel build ./src/index.html```. If you just want to view the site locally, run ```npx parcel ./src/index.html``` and click on the link the console will print.
3. verify that a ```dist``` folder is generated
4. open the index.html file inside the folder and add a ./ in front of all the paths
5. the contents of the ```dist``` folder can be pasted to the hosting service and the website should work

# Acknowledgements

This project is inspired from [Ade-Mir](https://github.com/Ade-mir/html-css-js-portfolio-tutorial-2). Go check it out or see the [youtube tutorial](https://www.youtube.com/watch?v=ldwlOzRvYOU)!

Wael Yasmina provides great [tutorials](https://www.youtube.com/watch?v=gyAdWWZRNBY) and shares his [github repos](https://github.com/WaelYasmina/drivingquiz) on how to publish a website that uses threejs and GLTFLoader. In addition, he also shows how to make a site interactive by linking mouse movements to character animations.

The 3D model is based on "Proportional Low Poly Man | FREE Download |" [(https://sketchfab.com/3d-models/proportional-low-poly-man-free-download-0bfd0e2b49a348a4b64b20cc8196e3b3)](https://sketchfab.com/3d-models/proportional-low-poly-man-free-download-0bfd0e2b49a348a4b64b20cc8196e3b3) by Robin Butler [(https://sketchfab.com/StarTrekGuy)](https://sketchfab.com/StarTrekGuy) licensed under CC-BY-4.0 [(http://creativecommons.org/licenses/by/4.0/)](http://creativecommons.org/licenses/by/4.0/)