// register the plugins with FilePond
FilePond.registerPlugin(
    FilePondPluginImageCrop,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileEncode
);

FilePond.setOptions({
    stylePanelAspectRatio: 110 / 80,
    imageResizeTargetHeight: 110,
    imageResizeTargetWidth: 80,

});




const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
    imageCropAspectRatio: 1,
    imageResizeTargetWidth: 80,

    imageResizeMode: 'contain',


    // add onaddfile callback
    onaddfile: (err, fileItem) => {
        console.log(err, fileItem.getMetadata('resize'));
    },



});