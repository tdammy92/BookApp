// register the plugins with FilePond
FilePond.registerPlugin(
    FilePondPluginImageCrop,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
);




const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
    imageCropAspectRatio: 1,
    imageResizeTargetWidth: 80,

    imageResizeMode: 'contain',


    // add onaddfile callback
    onaddfile: (err, fileItem) => {
        console.log(err, fileItem.getMetadata('resize'));
    },

    onpreparefile: (fileItem, output) => {
        // const img = new Image();
        // img.src = URL.createObjectURL(output);
        // document.body.appendChild(img);

        console.log(output)
    }

});