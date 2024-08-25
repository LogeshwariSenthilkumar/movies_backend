const express=require("express");
const router=express.Router();
const Movie=require("../../db/schemas/movieSchema");

router.get("/",async(req,res)=>{
    const movies = await Movie.find();
    res.json(movies);
});

router.get("/",async(res,req)=>{
    const queryParams=req.query;
    const filters={};
    if(queryParams.name){
        filters.name={
            $regex: `${queryParams.name}`,
            $option: "i",
        };
    }
    if(queryParams.rating){
        filters.rating={
            $gte:parseFloat(queryParams.rating),
        };
    }
    const movies=await Movie.find(filters);
    res.json(movies);
});


router.post("/",async (req,res) => {
    try{
        const moviesData = req.body;
        const newMovie = new Movie(moviesData);
        await newMovie.save();
        res.json(
            {
                message : 'Movies Added successfully',
            }
        );
    } catch(error){
        console.log(error);
        res.statusMessage(500).json({
            message : "Internal server error",
        });
    }
});

router.put("/:id",async(req,res)=>
{
    try{
        const movieId=req.params.id;
        const updateMovieData=req.body;
        await Movie.findByIdAndUpdate(movieId,updateMovieData);
        res.json({
            message : "Movie Updated successfully",
        });
    } catch(error)
    {
        console.log(error);
        res.status(500).json
({
    message : "Internal server error",
});    }
});
router.delete("/:id",async(req,res)=>
    {
        try{
            const movieId=req.params.id;
            const deleteMovieData=req.body;
            await Movie.findByIdAndDelete(movieId,deleteMovieData);
            res.json({
                message : "Movie deleted successfully",
            });
        } catch(error)
        {
            console.log(error);
            res.status(500).json
    ({
        message : "Internal server error",
    });    }
    });



module.exports=router;
