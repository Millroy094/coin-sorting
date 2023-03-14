# Coin sorting algorithm

The algorithm is incharge of getting the least of amount of coins in British currency as possible. The accepted coins are £2, £1, 50p, 20p, 10p, 2p, and 1p.

The user can only process values as string literals. The value can be passed in with a pound currency sign i.e. "£13" or just as a string number "13". If a number is passed without decimal, we assume the last two numbers are two digits after decimal places i.e. a value like "£13" would be treated as £0.13. However, if the value passed was "£13.50" we would treat the number as is.

## Valid/Invalid Inputs

     1. 200 -> valid
     2. 200.00 -> valid
     3. £200 -> valid
     4. £200.00 -> valid
     5. £ -> invalid
     6. £.2 -> invalid
     7. £0.2 -> valid
     8. £200.0 -> valid
     9. £200.402 -> invalid
     10. Empty String -> invalid
     11. No Value -> invalid
