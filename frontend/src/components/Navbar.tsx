import {Flex, Spacer, Heading} from "@chakra-ui/react"

export function Navbar() {
    return (
        <>
        <Flex width="100%" backgroundColor="rgb(18, 18, 20)" alignItems="center" p={5}>
            <Flex>
                <Heading as="h4" color="white">Logo</Heading>
            </Flex>
            <Spacer />
            <Flex>Pessoa</Flex>
        </Flex>
        </>
    )
}