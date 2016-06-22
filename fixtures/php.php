<?php
include_once 'sample3.php';
 
/**
 * Special global variable declaration DocBlock
 */ 
$GLOBALS['_myvar'] = 6;
 
define('testing', 6);
define('anotherconstant', strlen('hello'));
 
function firstFunc($param1, $param2 = 'optional')
{
    static $staticvar = 7;
    global $_myvar;
    return $staticvar;
}
 
/**
 * The first example class, this is in the same package as the
 * procedural stuff in the start of the file
 */
class myclass {
    var $firstvar = 6;
    var $secondvar =
        array(
            'stuff' =>
                array(
                    6,
                    17,
                    'armadillo'
                ),
            testing => anotherconstant
        );
 
    /**
     * Constructor sets up {@link $firstvar}
     */
    function myclass()
    {
        $this->firstvar = 7;
    }
    
    /**
     * Return a thingie based on $paramie
     * @param boolean $paramie 
     * @return integer|babyclass
     */
    function parentfunc($paramie)
    {
        if ($paramie) {
            return 6;
        } else {
            return new babyclass;
        }
    }
}
 
/**
 * @package sample1
 */
class babyclass extends myclass {
    /**
     * The answer to Life, the Universe and Everything
     * @var integer 
     */
    var $secondvar = 42;
    /**
     * Configuration values
     * @var array 
     */
    var $thirdvar;
    
    /**
     * Calls parent constructor, then increments {@link $firstvar}
     */
    function babyclass()
    {
        parent::myclass();
        $this->firstvar++;
    }
    
    /**
     * This always returns a myclass
     * @param ignored $paramie 
     * @return myclass 
     */
    function parentfunc($paramie)
    {
        return new myclass;
    }
}
?>
