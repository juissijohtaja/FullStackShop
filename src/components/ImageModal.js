import React from 'react'
import { Image, Modal, List } from 'semantic-ui-react'

const ImageModal = (props) => {
  console.log('imageSource', props.imageSource)

  return (
    <Modal closeIcon basic trigger={<List link><List.Item as='a' icon='zoom' content='Suurenna kuva' /></List>}>
      <Modal.Content image>
        <Image src={props.imageSource} />
      </Modal.Content>
    </Modal>
  )}

export default ImageModal

