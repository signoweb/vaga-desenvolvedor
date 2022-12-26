import { Button, Flex, useToast } from '@chakra-ui/react'
import { Modal } from 'components/Modal'
import { ProductContext } from 'pages-components/Products'
import { useContext } from 'react'
import { api } from 'services/api'

interface DeleteItemModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteItemModal({ id, isOpen, onClose }: DeleteItemModalProps) {
  const { removeProduct } = useContext(ProductContext)

  const toast = useToast({ position: 'top' })

  async function handleDeleteItem() {
    try {
      const response = await api.delete('/products/' + id)

      removeProduct(response.data)
      toast.closeAll()
      toast({
        status: 'success',
        title: 'Produto deletado com sucesso.',
        duration: 2000,
        isClosable: true,
      })

      onClose()
    } catch (error: any) {
      toast.closeAll()
      toast({
        status: 'error',
        title: error?.response.data.message,
        duration: 2000,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deletar item?">
      <Flex gap={2}>
        <Button onClick={onClose} color="blue.900" flex="1">
          Cancelar
        </Button>
        <Button
          loadingText="Deletando"
          border="2px"
          borderColor="red.400"
          color="red.400"
          bg="none"
          flex="1"
          _hover={{
            bg: 'red.50',
          }}
          _active={{
            bg: 'red.100',
            color: 'red.700',
          }}
          onClick={handleDeleteItem}
        >
          Deletar
        </Button>
      </Flex>
    </Modal>
  )
}
