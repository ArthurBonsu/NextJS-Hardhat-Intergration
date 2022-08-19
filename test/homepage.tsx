import {MenuLabels} from 'types';
// import {Navbar} from 'components'
import { useRouter } from 'next/router'
import { ComponentType, FC, useCallback, useState } from 'react'
import { Box, Flex, Icon, Menu, MenuButton, Text, Tooltip , Button,HStack, Center, Breadcrumb,
    BreadcrumbItem,    BreadcrumbLink,    BreadcrumbSeparator, Link, Avatar, Stack, chakra, Heading} from '@chakra-ui/react'
import { ChevronUpIcon, DuplicateIcon, LockClosedIcon, LoginIcon, UserAddIcon, PlusIcon, BookOpenIcon,CubeTransparentIcon } from '@heroicons/react/outline'
import { PresentationChartBarIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';


   // Hard Coded but we could set up a page where it can be put into it to be hardcoded


   //homepage: 0,
   //   protectedpage: 'TokenBTC',
   //   Registerpage: 'TOKBTC',
   //   Protectedpage: 100,
   //   logoUri: '0xef719f31e4F71392cDAda87E94e3a9C25Fce88B6'


   // set up the objects 
   // set the arrays into the text for the labels  
   // Set up a link router for each one 
   // Set a route for the onclick 
   // FOr each one route to the main page 


   const navbarlabels:  MenuLabels[] = [   

    {   icon: UserAddIcon,
        label: 'Register', 
        pathname: 'RegisterPage'
      
    }, 
    {  
        icon: PlusIcon,
        label: 'Create', 
        pathname: 'create'
 
    },
    
    { 
        icon: PresentationChartBarIcon,
        label: 'Token Swap', 
        pathname: 'originaltokenswap'

    }
  ]
 
    const HomePage: FC<MenuLabels> = ({  icon,label, pathname, ...rest }) => {

    const [isCurrentPage, setisCurrentPage] = useState(false)
    const [isRegisteration, setIsRegistration] = useState(false)
    const [isTransaction, setIsTransaction] = useState(false)
    const [isSwapping, setIsSwapping] =  useState(false)
    const {data:session} = useSession()
   
  const router = useRouter()

  const onClickAction = () => { 
    if (pathname == 'RegisterPage'){
    setisCurrentPage(true)
  }
  if (pathname == 'create'){
    setisCurrentPage(true)
  }
  if (pathname == 'originaltokenswap'){
    setisCurrentPage(true)
  }
  }
  return (

   
      <Flex color='white'>
      <Center w='100px' bg='green.500'>

      <HStack spacing='24px'>
                       
    HOW TO LABELIZE 
    <Heading > Subscribe To Cules Coding </Heading>
     <Breadcrumb>
 
     <BreadcrumbItem>
    <BreadcrumbLink icon={BookOpenIcon}  isCurrentPage={!isRegisteration} onClick={ onClickAction} as={Link} to={{ pathname: './RegisterPage'  }}>
    <Stack spacing={3}>
  
       <Text fontSize='md'>(md) Registration</Text>

     </Stack>
    </BreadcrumbLink>
    </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink   isCurrentPage={!isTransaction}   icon={CubeTransparentIcon} onClick={onClickAction} as={Link} to={{ pathname: './create'  }}>
    <Stack spacing={3}>
  
       <Text fontSize='md'>(md) Transaction</Text>

     </Stack>
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem >
    <BreadcrumbLink isCurrentPage ={isSwapping}      icon={CubeTransparentIcon}  onClick={ onClickAction}  as={Link} to={{ pathname: './originaltokenswap' }}>
    <Stack spacing={3}>
  
  <Text fontSize='md'>(md) Swap</Text>

</Stack>
 </BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>

</HStack>
  </Center>
  
</Flex>
  )
  

}
  
  export default HomePage; 
